import { getMinimumProfile } from "@thatawesomekk/single-sign-on";
import Playlist from "../../models/Playlist.js";

export default async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const playlist = await Playlist.findById(id).populate("videoIds");
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    const userIds = playlist.videoIds.map((video) => video.userId);

    const payload = await fetchAuthor(userIds).then((res) => res.users);

    for (let i = 0; i < playlist.videoIds.length; i++) {
      const video = playlist.videoIds[i];
      const user = payload.find((user) => user.uid === video.userId);
      video._doc.userId = user;
    }

    return res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const fetchAuthor = async (userIds) => {
  return await getMinimumProfile(userIds);
};
