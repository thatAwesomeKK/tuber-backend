import mongoose from "mongoose";

export const videoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "TITLE",
    },
    description: {
      type: String,
      required: true,
      default: "DESCRIPTION",
    },
    thumbnail: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Array,
      default: [],
    },
    dislikes: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

videoSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("video", videoSchema);
