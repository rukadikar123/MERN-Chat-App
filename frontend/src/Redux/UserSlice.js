import { createSlice } from "@reduxjs/toolkit";

// Creating the UserSlice with initial state and reducers
const UserSlice = createSlice({
  name: "user", // Name of the slice
  initialState: {
    userData: null, // Stores the logged-in user's data
    otherUsers: null, // Stores data of other users
    selectedUser: null, // Stores the currently selected user
    socket: null, // Stores the socket.io connection instance
    onlineUsers: null, // Stores the list of online users
    searchData: null, // Stores the search results or search input data
  },
  reducers: {
    // Sets the logged-in user data
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    // Sets the list or data of other users
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    // Sets the currently selected user
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    // Sets the socket instance
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    // Sets the list of online users
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    // Sets the search data
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

// Exporting the actions so they can be dispatched in components
export const {
  setUserData,
  setOtherUsers,
  setSelectedUser,
  setSocket,
  setOnlineUsers,
  setSearchData,
} = UserSlice.actions;

export default UserSlice.reducer;
