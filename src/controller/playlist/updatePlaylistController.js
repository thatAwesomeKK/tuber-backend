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

    const { name } = req.body;
    if (!name) {
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

    const updatedPlaylist = await Playlist.findByIdAndUpdate(id, {
      name,
    });
    return res.status(200).json({
      success: true,
      message: "Playlist updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
