import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true, // allows nulls
      index: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/driqu2cgm/image/upload/v1745338991/Default_User_d2x0uo.png",
    },
    status: {
      type: String,
      maxlength: 100,
      default: "Hey there! I’m using Chatly 🚀",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
      index: true,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    fcmToken: {
      type: String,
      index: true,
    },
    notifications: {
      chat: { type: Boolean, default: true },
      mentions: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, lastSeen: -1 });

const User = mongoose.model("User", userSchema);
export default User;
