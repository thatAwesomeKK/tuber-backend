import { GetFullProfile } from "@thatawesomekk/single-sign-on";

//Verify Access Token
export const verifyAccessToken = async (req, res, next) => {
  try {
    const token = await req.cookies.accessToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Not Authorized" });
    }
    const payload = await GetFullProfile(token);
    req.verify = payload.user;
  } catch (error) {
    // res.clearCookie("accessToken", cookieConfig);
    return res.status(401).json({ success: false, error: "Not Authorized" });
  }
  next();
};
