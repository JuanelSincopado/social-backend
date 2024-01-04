import express from "express";
import authRoutes from "./routes/auth.route";
import userRouter from "./routes/user.route";
import connectDB from "./config/mongodb";
import postRouter from "./routes/post.route";
import { access } from "fs";
const cors = require("cors");

const app = express();

app.use(express.json());

connectDB()

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}


app.use(cors(corsOptions))

app.use("/user", userRouter) // users
app.use("/auth", authRoutes) // auth
app.use("/post", postRouter) // posts

app.listen(3000, () => {
  console.log("Server started on port 3000");
});