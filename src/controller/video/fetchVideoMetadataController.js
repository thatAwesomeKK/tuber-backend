import { getMinimumProfile } from "@thatawesomekk/single-sign-on";
import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a video id",
      });
    }
    const foundVideo = await Video.findById(id);
    if (!foundVideo) {
      return res.status(404).json({
        success: false,
        message: "No video found",
      });
    }

    const payload = await fetchAuthor(foundVideo.userId);

    const user = payload.users[0];

    foundVideo._doc.userId = user;

    return res.status(200).json({ success: true, video: foundVideo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const fetchAuthor = async (userId) => {
  return await getMinimumProfile(userId);
};
