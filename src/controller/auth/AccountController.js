import cookieConfig from "../../config/cookieConfig.js";

export default async function (req, res) {
  const {token: accessToken, type} = req.query;

  switch(type) {
    case "signin":
      res.cookie("accessToken", accessToken, cookieConfig);
      break
    case "signout":
      res.clearCookie("accessToken", cookieConfig);
      res.clearCookie("profilePicture", cookieConfig);
      break;
    default:
      return res.status(400).json({ success: false, error: "Invalid type" });
  }
  return res.redirect(process.env.CLIENT_URL);
}
