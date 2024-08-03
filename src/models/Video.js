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
      default:
        "https://i.ytimg.com/vi/4nVDijlvVG0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDOMfXeLp85kb4gy1ZlTmzU05rKAQ",
    },
    likes: {
      type: Array,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("video", videoSchema);
