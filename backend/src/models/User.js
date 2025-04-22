import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true, // allow nulls
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/driqu2cgm/image/upload/v1745338991/Default_User_d2x0uo.png",
    },
    status: {
      type: String,
      default: "Hey there! I’m using Chatly 🚀",
    },
    bio: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    fcmToken: {
      type: String,
    },
    notifications: {
      chat: { type: Boolean, default: true },
      mentions: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
