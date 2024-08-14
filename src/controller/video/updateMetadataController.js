import cloudinary from "../../config/cloudinary.js";
import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const { title, description, tags, thumbnail } = req.body;
    const videoId = req.params.id;

    const foundVideo = await Video.findOne({ videoId: videoId });
    if (!foundVideo) {
      return res.status(404).json({
        success: false,
        message: "No video found",
      });
    }
    // console.log(foundVideo);
    const newMetadata = {};

    if (title) newMetadata.title = title;
    if (description) newMetadata.description = description;
    if (tags) newMetadata.tags = tags;
    if (thumbnail) {
      const response = await cloudinary.uploader.upload(thumbnail, {
        upload_preset: "vmbhsyoa",
      });
      newMetadata.thumbnail = response.secure_url;
    }

    await Video.findOneAndUpdate({ videoId: foundVideo.videoId }, newMetadata);

    return res.status(200).json({
      success: true,
      message: "Metadata updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
