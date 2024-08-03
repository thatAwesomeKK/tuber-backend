import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth.js";
import videoRouter from "./routes/video.js";
import profileRouter from "./routes/profile.js";
import hookRouter from "./routes/hook.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1000mb" }));

app.get("/", (req, res) => {});

app.use("/api/auth", authRouter);
app.use("/api/video", videoRouter);
app.use("/api/profile", profileRouter);
app.use("/api/hook", hookRouter);

export default app;
