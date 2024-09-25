import { getMinimumProfile } from "@thatawesomekk/single-sign-on";
import Video from "../../models/Video.js";

export default async function (req, res) {
  const { s } = req.query;

  const videos = await Video.find({
    $or: [
      { title: { $regex: s, $options: "i" } },
      { description: { $regex: s, $options: "i" } },
    ],
  }).select("title thumbnail likes videoId userId createdAt views description");

  const userIds = videos.map((video) => video.userId);

  const payload = await fetchAuthor(userIds).then((res) => res.users);

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const user = payload.find((user) => user.uid === video.userId);
    video._doc.userId = user;
  }

  return res.status(200).json({
    success: true,
    videos,
  });
}

const fetchAuthor = async (userIds) => {
  return await getMinimumProfile(userIds);
};
