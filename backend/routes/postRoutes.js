const express = require("express");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, postController.createPost);
router.get("/", auth, postController.getAllPosts);
router.get("/:userId", auth, postController.getPosts);
router.delete("/:id", auth, postController.deletePost);
router.put("/:id", auth, postController.updatePost);

module.exports = router;
