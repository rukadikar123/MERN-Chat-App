import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice({
    name:'user',
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUser:null,
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData=action.payload
        },
        setOtherUsers:(state, action)=>{
            state.otherUsers=action.payload
        },
        setSelectedUser:(state, action)=>{
            state.selectedUser=action.payload
        },

    }

})

export const {setUserData, setOtherUsers, setSelectedUser}=UserSlice.actions

export default UserSlice.reducer