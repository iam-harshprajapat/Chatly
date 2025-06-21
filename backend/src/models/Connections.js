import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "blocked"],
      default: "pending",
      index: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    acceptedAt: Date,
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });
connectionSchema.index({ recipient: 1, status: 1, requestedAt: -1 });
connectionSchema.index({ status: 1, requester: 1 });
connectionSchema.index({ status: 1, recipient: 1 });

const Connection = mongoose.model("Connection", connectionSchema);
export default Connection;
