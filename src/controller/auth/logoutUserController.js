import cookieConfig from "../../config/cookieConfig.js";

export default async function (req, res) {
  try {
    res.clearCookie("accessToken", cookieConfig);
    res.clearCookie("profilePicture", cookieConfig);
    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
