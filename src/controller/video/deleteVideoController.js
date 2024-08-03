import mongoose from "mongoose";
import Grid from "gridfs-stream";
import Video from "../../models/Video.js";

const conn = mongoose.connection;
let gfs;
let gridfsBucket;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("videoData");
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "videoData",
  });
});

export default async function (req, res) {
  const { videoId } = req.params;

  try {
    const foundVideo = await Video.findById(videoId);
    if (!foundVideo) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const ObjectID = mongoose.mongo.ObjectId;
    const video = await gfs.files.findOne({
      _id: new ObjectID(foundVideo.videoId),
    });
    if (!video) {
      return res.status(400).send("No Video Found in Chunks");
    }

    await gridfsBucket.delete(new ObjectID(video._id));
    await Video.findByIdAndDelete(foundVideo._id);

    return res.status(200).json({ success: true, message: "Video Deleted" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
