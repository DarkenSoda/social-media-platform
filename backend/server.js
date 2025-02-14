const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require('./models/Comment');
const Like = require('./models/Like');
const Follow = require('./models/Follow');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const followRoutes = require('./routes/followRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database tables
User.createTable();
Post.createTable();
Comment.createTable();
Like.createTable();
Follow.createTable();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
