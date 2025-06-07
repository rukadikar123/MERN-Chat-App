# Real-time Chat App (Backend)

A Node.js backend for a real-time chat application using **Express**, **MongoDB**, **Socket.IO**, and **Cloudinary**.

---

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Socket.IO Events](#socketio-events)
- [Notes](#notes)

---


## Features

- User authentication (register, login, logout)
- JWT-based authentication with HTTP-only cookies
- Real-time messaging with Socket.IO
- Profile management (update name, profile picture)
- Search users
- Image upload via Cloudinary
- MongoDB models for User, Message, and Conversation

---

## API Endpoints

### Auth Routes (`/api/auth`)

- **POST `/register`**  
  Register a new user.  
  **Body:** `{ username, email, password }`

- **POST `/userlogin`**  
  Login user.  
  **Body:** `{ email, password }`

- **GET `/userlogout`**  
  Logout user (requires authentication).

---

### User Routes (`/api/user`)

- **GET `/current`**  
  Get current logged-in user (requires authentication).

- **PUT `/profile`**  
  Update profile name and/or profile picture (requires authentication).  
  **FormData:** `name`, `image` (file)

- **GET `/others`**  
  Get all users except the current user (requires authentication).

- **GET `/search?query=...`**  
  Search users by name or username (requires authentication).

---

### Message Routes (`/api/message`)

- **POST `/send/:id`**  
  Send a message (text or image) to user with id `:id` (requires authentication).  
  **FormData:** `message`, `image` (file, optional)

- **GET `/get/:id`**  
  Get all messages between current user and user with id `:id` (requires authentication).

---

## Socket.IO Events

- **Connection:**  
  When a user connects, their socket is mapped to their userId.

- **getOnlineUsers:**  
  Emits the list of currently online user IDs to all clients.

- **newMessage:**  
  Emits a new message to the recipient in real-time.

---


## Notes

- All protected routes require the `jwt` cookie for authentication.
- Image uploads are handled via Cloudinary.
- Real-time features use Socket.IO and require the frontend to connect with the correct userId.
- CORS is configured for the deployed frontend URL.

---