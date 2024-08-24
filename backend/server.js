const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./connect");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

connectDB();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "https://66c96b5e882f3d7d31c736ba--gorgeous-sunflower-a02c16",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
