# Blog App

This project is a simple Blog. The application consists four pages home page, login page, register page and blog details page 

Deployed link: https://blogapp-zuai.netlify.app/

## Technologies Used

### Backend
- **Node.js** with Express for server-side logic
- **JWT (JSON Web Tokens)** for user authentication and authorization
- **MongoDB** for database storage

### Frontend
- **React** for building the user interface
- **React Router** for client-side routing

## Features

- User authentication (Register and login)
- Create, read,  update (only owner), and delete (only owner) Todo tasks


## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Reactjs

### Installation

1. Clone the repository

2. Navigate to the project directory:

```bash
cd Todo
```

3. Install backend dependencies::

```bash
cd backend
npm install
```
4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Running the Application

1. Set up environment variables
 Create a `.env` file in the backend directory and add your MongoDB connection string and JWT secret:

4. Start the backend server
   
```bash
cd backend
node server.js
```
5. Start the frontend development server
   
```bash
cd frontend
npm run dev
```
 The application should now be running on `http://localhost:5173`.

## Usage

1. Sign up for a new account or log in with existing credentials
2. Add new tasks using the input field
3. Click on a task to mark it as complete
4. Use the filter buttons to view all, active, or completed tasks
5. Edit or delete tasks using the respective buttons

## Folder Structure
   ```arduino
     Todo-app/
     │
     ├── backend/
     │   ├── config.js
     │   ├── middleware/ 
     │   ├── models/
     │   ├── routes/
     │   ├── utils/
     │   └── server.js
     │   └── package.json
     │
     ├── frontend/
     │   ├── public/
     │   ├── src/
     │   │   ├── components/
     │   │   ├── pages/
     │   │   ├── App.jsx
     │   │   ├── index.css 
     │   │   ├── main.jsx
     │   └── index.html
     │   └── package.json
     │
     └── README.md

   ```
# To-Do List API

Base URL: https://blog-app-imlh.onrender.com/api

## Authentication

All endpoints except /register and /login require authentication. 
Authorization: Bearer <token>

## Endpoints

### Register User
- POST /register
- Request body: { "username": "user", "password": "password123" }
- Response: { "message": "User registered successfully" }

### Login User
- POST /login
- Request body: { "username": "user", "password": "password123" }
- Response: { "message": "Login successful", "token": "token", "username": "username"  }

### Create Post
- POST /posts
- Request body: { "title": title,"summary":summary, "file": file, "content":content}
- Response: { "_id": "_id", "author": "author", "title": "title","summary":summary, "cover": cover, "content": content ,"createdAt":createdAt}

### Get Todos
- GET /posts
- Response: [{ "_id": "_id", "author": "author", "title": "title","summary":summary, "cover": cover, "content": content ,"createdAt":createdAt}, ...]

### Update Todo
- PUT /posts/:id
- Request body: { { "_id": "_id", "author": "author", "title": "title","summary":summary, "cover": cover, "content": content }
- Response: { { "_id": "todo_id", "author": "author", "title": "title","summary":summary, "cover": cover, "content": content ,"createdAt":createdAt,"updatedAt":upadatedAt }



### Delete Post
- DELETE /posts/:id
- Response: { "message": "Post deleted successfully" }

  
  ## Contributing

  Contributions are welcome! Please fork the repository and create a pull request.
  
  #### Happy coding!
