import { GetMinimumProfile } from "@thatawesomekk/single-sign-on";
import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const vids = await Video.find({isPublished: true}).select(
      "title thumbnail likes videoId userId"
    );

    if (!vids) {
      return res.status(400).json({
        success: false,
        message: "No videos found",
      });
    }

    for (let i = 0; i < vids.length; i++) {
      const video = vids[i];
      const payload = await fetchAuthor(video.userId);
      const user = payload.user;
      video._doc.userId = user;
    }

    return res.status(200).json({
      success: true,
      videos: vids,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const fetchAuthor = async (userId) => {
  return await GetMinimumProfile(userId)
};
