import cookieConfig from "../../config/cookieConfig.js";

export default async function (req, res) {
  try {
    const user = req.verify;    
    // console.log(user.pfp);
    res.cookie("profilePicture", user.pfp, cookieConfig);
    return res.status(200).json({ success: true, pfp: user.pfp });
  } catch (error) {
    console.log(error);
  }
}
