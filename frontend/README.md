# React + Vite

# Real-time Chat App (Frontend)

(DeployedLink)[https://mern-chat-app-1-98ek.onrender.com]

A real-time chat application built with **React**, **Redux Toolkit**, **Vite**, and **Socket.IO**. This frontend connects to a backend API for authentication, messaging, and user management.

---


## Table of Contents

- [Features](#features)
- [Redux Slices](#redux-slices)
- [Custom Hooks](#custom-hooks)
- [Components](#components)
- [Pages](#pages)
- [Socket.IO Integration](#socketio-integration)

---


## Features

- User authentication (signup, login, logout)
- Real-time messaging with Socket.IO
- Profile management (update name, profile picture)
- Online users indicator
- Search users
- Image sharing in chat
- Responsive UI

---


## Redux Slices

### UserSlice.js

Manages user-related state:  
- `userData`, `otherUsers`, `selectedUser`, `socket`, `onlineUsers`, `searchData`.

**Actions:**  
- `setUserData`, `setOtherUsers`, `setSelectedUser`, `setSocket`, `setOnlineUsers`, `setSearchData`

### MessageSlice.js

Manages chat messages.

**Actions:**  
- `setMessages`

### store.js

Configures the Redux store with `user` and `message` reducers.

---

## Custom Hooks

- **useGetCurrentUser**: Fetches the current logged-in user and updates Redux.
- **useGetOtherUsers**: Fetches all users except the current user.
- **useGetMessages**: Fetches messages for the selected user.

---


## Components

### Sidebar.jsx

- Displays user info, online users, search bar, and user list.
- Handles logout and user selection.

### MessageArea.jsx

- Shows chat messages with the selected user.
- Supports sending text and image messages.
- Emoji picker integration.

### SenderMessage.jsx & RecieverMessage.jsx

- Render messages sent and received, with profile pictures.

---


## Pages

### Home.jsx

- Main chat layout with Sidebar and MessageArea.

### Login.jsx

- User login form.

### Signup.jsx

- User registration form.

### Profile.jsx

- Update profile name and picture.

---


## Socket.IO Integration

- Socket is initialized in `App.jsx` when the user is logged in.
- Listens for online users and new messages.
- Cleans up socket on logout or user change.

---