# Social Media Platform

This is a simple social media platform where users can create posts, comment on posts, like posts, and follow other users. The app is built using a **React** frontend and a **Node.js/Express** backend with a **SQLite** database.

---

## Features

### 1. **User Authentication**

- Users can sign up and log in.
- Authentication is handled using **JWT (JSON Web Tokens)**.
- Protected routes ensure that only logged-in users can access certain features.

### 2. **Posts**

- Users can create posts with text content.
- Posts are displayed in reverse chronological order (newest first).
- Users can edit or delete their own posts.

### 3. **Comments**

- Users can add comments to posts.
- Comments are displayed below each post.
- Users can edit or delete their own comments.

### 4. **Likes**

- Users can like posts.
- The number of likes is displayed on each post.
- Users can unlike a post if they've already liked it.

### 5. **Follow/Unfollow**

- Users can follow or unfollow other users.
- The follower and following counts are displayed on each user's profile.
- Users can see posts from users they follow on the home page.

### 6. **Profile Page**

- Each user has a profile page displaying their posts, follower count, and following count.
- Users can update their profile picture by providing an image URL.

---

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling client-side routing.
- **Axios**: For making HTTP requests to the backend.
- **Bootstrap**: For styling and responsive design.

### Backend

- **Node.js**: A JavaScript runtime for building the server.
- **Express**: A web framework for Node.js.
- **SQLite**: A lightweight, file-based database for storing data.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.

---

### Installation  

#### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)

#### Steps  

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/social-media-app.git
   cd social-media-platform
   ```

2. **Install dependencies**:  
   - For the frontend (using Vite):

     ```bash
     cd frontend
     npm install
     ```

   - For the backend:

     ```bash
     cd backend
     npm install
     ```  

3. **Set up the database**:

   - The app uses SQLite, so no additional setup is required. The database file (`social-media.db`) will be created automatically when you run the backend.  

4. **Run the backend server**:

   ```bash
   cd backend
   npm start
   ```

   The backend will start on `http://localhost:5000`.  

5. **Run the frontend**:

   ```bash
   cd frontend
   npm run dev
   ```  

   The frontend will start on `http://localhost:5173`.  

6. **Access the app**:  
   Open your browser and navigate to `http://localhost:5173`.

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.

### Posts

- **GET /api/posts**: Fetch all posts.
- **POST /api/posts**: Create a new post.
- **PUT /api/posts/:id**: Update a post.
- **DELETE /api/posts/:id**: Delete a post.

### Comments

- **POST /api/comments**: Add a comment to a post.
- **GET /api/comments/:postId**: Fetch comments for a post.
- **PUT /api/comments/:id**: Update a comment.
- **DELETE /api/comments/:id**: Delete a comment.

### Likes

- **POST /api/likes/:postId**: Like a post.
- **DELETE /api/likes/:postId**: Unlike a post.

### Follows

- **POST /api/follows/:userId**: Follow a user.
- **DELETE /api/follows/:userId**: Unfollow a user.

### Users

- **GET /api/users/:username**: Fetch user details.
- **POST /api/users/update-profile-picture**: Update the user's profile picture.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your branch.
4. Submit a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

Enjoy using the **Social Media App**! 🚀
