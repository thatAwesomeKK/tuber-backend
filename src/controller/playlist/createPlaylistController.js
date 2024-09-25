import Playlist from "../../models/Playlist.js";

export default async function (req, res) {
  try {
    const { name, userId, videoId } = req.body;
    if (!name || !userId || !videoId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newPlaylist = new Playlist({
      name,
      createdBy: userId,
      videoIds: [videoId],
    });
    await newPlaylist.save();

    return res.status(201).json({
      success: true,
      message: "Playlist created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
