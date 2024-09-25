import mongoose from "mongoose";

export const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    videoIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

playlistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("playlist", playlistSchema);
