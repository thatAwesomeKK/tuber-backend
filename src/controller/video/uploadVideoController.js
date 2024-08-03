import axios from "axios";
import Video from "../../models/Video.js";
import fs from "fs";

// route for uploading a file  /video/upload
export default async function (req, res) {
  try {
    const user = req.verify;
    const uploadedFile = req.file;
    console.log(uploadedFile);

    // const formData = new FormData();

    const fileStream = fs.createReadStream(uploadedFile.path);
    // formData.append("video", fileStream);
    // const readStream = fs.createReadStream(filePath);
    // readStream.pipe(res);

    const payload = await axios({
      method: "post",
      url: "https://upload.thatawesomekk.eu.org/api/video/upload",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      data: fileStream,
      maxContentLength: Infinity, // Required for large files
      maxBodyLength: Infinity, // Required for large files
    }).then((resp) => resp.data);

    console.log(payload);

    const newVideo = new Video({
      userId: user.uid,
      videoId: payload.fileName,
    });

    await newVideo.save();

    // console.log(vid.data);
    return res.status(200).json({
      success: true,
      message: "Video uploadeded!",
      videoId: newVideo._id,
    });
  } catch (error) {
    console.log(error.response);
  }
}
