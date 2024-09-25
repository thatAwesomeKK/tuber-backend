import mongoose from "mongoose";

const conn = mongoose.connection;
let gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "videos",
  });
  console.log("Connected to MongoDB and GridFSBucket initialized");
});

// route for streaming a file  /video/stream?filename=
export default async function (req, res) {
  try {
    const { filename } = req.params;
    const file = gridFSBucket.openDownloadStreamByName(filename);
    if (!file) {
      return res.status(400).send("No Video Found");
    }
    file.pipe(res);
  } catch (error) {
    // console.log(error);
    return res.status(400).send("Internal server error");
  }
}
