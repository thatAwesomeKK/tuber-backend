import cookieConfig from "../../config/cookieConfig.js";

export default async function (req, res) {
  const { token: accessToken } = req.query;
  try {
    res.cookie("accessToken", accessToken, cookieConfig);
    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
