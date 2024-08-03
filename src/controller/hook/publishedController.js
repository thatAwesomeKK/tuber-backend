import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const { filename, thumbnail } = req.body;

    console.log(filename);

    await Video.findOneAndUpdate(
      {
        videoId: filename,
      },
      { isPublished: true, thumbnail }
    );

    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
