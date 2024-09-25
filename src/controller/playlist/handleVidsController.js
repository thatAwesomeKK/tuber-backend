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

    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    if (playlist.videoIds.includes(videoId)) {
      await Playlist.findOneAndUpdate(
        { _id: id },
        {
          $pull: {
            videoIds: videoId,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Video removed from playlist successfully",
      });
    } else {
      await Playlist.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: {
            videoIds: videoId,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Video added to playlist successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
