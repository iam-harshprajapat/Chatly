import logger from "thirtyfour";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateJwt = (user) => {
  return jwt.sign(
    {
      uid: user.firebaseUID,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const loginController = async (req, res) => {
  const { uid, email, name, phone } = req.user;
  try {
    let user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      user = new User({
        firebaseUID: uid,
        email,
        name,
        phone: phone || null,
      });

      await user.save();
    }
    const token = generateJwt(user);
    res.cookie("chatly", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    logger.info(`User logged in: ${user.email}`);
    logger.info(req.user);
    return res
      .status(200)
      .send({ success: true, message: "User logged in successfully" });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    return res
      .status(500)
      .send({ success: false, message: "Error logging in user" });
  }
};

export default loginController;
