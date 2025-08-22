import logger from "thirtyfour";
import User from "../models/user.js";
import { generateJWT } from "../utils/jwt.js";
import redis from "./../config/redisClient.js";
import cloudinary from "../config/cloudinary.js";

const loginController = async (req, res) => {
  const { uid, email, name, phone, picture } = req.user;

  const default_profile =
    "https://res.cloudinary.com/driqu2cgm/image/upload/v1745338991/Default_User_d2x0uo.png";

  try {
    let user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      if (picture) {
        cloudinary.uploader.upload(picture);
      }
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
  const id = req.user.id;
  console.log(id);
  const redisKey = `user:${id}`;
  try {
    const cached = await redis.get(redisKey);
    if (cached) {
      return res.status(200).send({
        success: true,
        message: "user fetched successfully",
        user: JSON.parse(cached),
      });
    }
    const user = await User.findById(id);
    if (user) {
      redis.setex(redisKey, 300, JSON.stringify(user));
      return res.status(200).send({
        success: true,
        message: "user fetched successfully",
        user,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

const findUserById = async (req, res) => {
  const { userId } = req.params;
  const redisKey = `user:${userId}`;
  try {
    const cached = await redis.get(redisKey);
    if (cached) {
      return res.status(200).send({
        success: true,
        message: "user fetched successfully",
        user: JSON.parse(cached),
      });
    }
    const user = await User.findById(userId);
    if (user) {
      redis.setex(redisKey, 300, JSON.stringify(user));
      return res.status(200).send({
        success: true,
        message: "user fetched successfully",
        user,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

export { loginController, getUserController, findUserById };
