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
      index: true, // ✅ indexed for search
    },
    username: {
      type: String,
      unique: true,
      sparse: true, // ✅ allows null + still unique
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
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    fcmToken: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    notifications: {
      chat: { type: Boolean, default: true },
      mentions: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

// 🔍 Composite index for admin dashboards or activity queries
userSchema.index({ role: 1, lastSeen: -1 });

// ✅ Prevent OverwriteModelError during dev or hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
