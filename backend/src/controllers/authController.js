import logger from "thirtyfour";
import User from "../models/user.js";
import { generateJWT } from "../utils/jwt.js";

const loginController = async (req, res) => {
  const { uid, email, name, phone, picture } = req.user;

  const default_profile =
    "https://res.cloudinary.com/driqu2cgm/image/upload/v1745338991/Default_User_d2x0uo.png";

  try {
    let user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      user = new User({
        firebaseUID: uid,
        email,
        name,
        phone: phone ? phone : null,
        avatar: picture || default_profile,
      });
      await user.save();
    } else {
      // Update user details if they have changed
      user.email = email;
      user.name = name;
      user.phone = phone ? phone : null;
      user.avatar = picture || default_profile;
      await user.save();
    }
    //token generation
    const token = generateJWT(user);
    logger.info(`A thread was created for user: ${user.email}`);
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      chatly_auth_tea: token,
    });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    return res
      .status(500)
      .send({ success: false, message: "Error logging in user" });
  }
};

const getUserController = async (req, res) => {
  const { uid } = req.user;

  try {
    const user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      user: {
        firebaseUID: user.firebaseUID,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    logger.error(`Error fetching user: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error fetching user",
    });
  }
};

export { loginController, getUserController };
