import express from "express";
import loginRoutes from "./routes/login.route";
import userRouter from "./routes/user.route";
import connectDB from "./config/mongodb";

const app = express();

app.use(express.json());

connectDB()

app.use("/user", userRouter)
app.use("/login", loginRoutes)

app.listen(3000, () => {
  console.log("Server started on port 3000");
});