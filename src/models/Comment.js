import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

commentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("comment", commentSchema);
