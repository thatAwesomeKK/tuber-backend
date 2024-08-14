import express from "express";
import morgan from "morgan";
import cors from "cors";
import videoRouter from "./routes/video.js";
import userRouter from "./routes/user.js";
import hookRouter from "./routes/hook.js";
import commentRouter from "./routes/comment.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1000mb" }));

app.get("/", (req, res) => {
  res.end("Hello World");
});

app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);
app.use("/api/hook", hookRouter);

export default app;
