const express = require("express");
const postController = require("../controllers/postController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  postController.createPost
);
router.put(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  postController.updatePost
);
router.delete("/:id", postController.deletePost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);

module.exports = router;
