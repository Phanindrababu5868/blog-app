const Post = require("../models/Post");
const fs = require("fs");
const { verifyToken } = require("../utils/jwtUtils");
const { error } = require("console");
const { uploadOnCloudinary } = require("../utils/cloudinaryUtils");

exports.createPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  verifyToken(req.cookies.token, async (info) => {
    if (info) {
      const { title, summary, content } = req.body;
      const cloudinaryResponse = await uploadOnCloudinary(newPath);
      if (!cloudinaryResponse)
        return res.status(500).json({ message: "Cloudinary upload failed" });
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: cloudinaryResponse.secure_url,
        author: info.id,
      });
      res.json(postDoc);
    } else {
      res.json({ message: "Post Creation failed" });
    }
  });
};

exports.updatePost = async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  verifyToken(req.cookies.token, async (info) => {
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    if (JSON.stringify(postDoc.author) !== JSON.stringify(info.id)) {
      return res.status(400).json("You are not the author");
    }

    let coverUrl = postDoc.cover;
    if (newPath) {
      const cloudinaryResponse = await uploadOnCloudinary(newPath);
      if (!cloudinaryResponse)
        return res.status(500).json("Cloudinary upload failed");
      coverUrl = cloudinaryResponse.secure_url;
    }

    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    postDoc.cover = coverUrl;

    await postDoc.save();
    res.json(postDoc);
  });
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(postDoc);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    verifyToken(req.cookies.token, async (info) => {
      try {
        const postDoc = await Post.findById(id);
        if (!postDoc) {
          return res.status(404).json({ message: "Post not found" });
        }

        if (JSON.stringify(postDoc.author) !== JSON.stringify(info.id)) {
          return res.status(403).json({ message: "You are not the author" });
        }

        await Post.deleteOne({ _id: id });
        res.status(200).json({ message: "Post deleted successfully" });
      } catch (dbError) {
        res
          .status(500)
          .json({ message: "Database error", error: dbError.message });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
