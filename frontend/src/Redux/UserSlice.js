import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice({
    name:'user',
    initialState:{
        userData:null,
        otherUsers:null,
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData=action.payload
        },
        setOtherUsers:(state, action)=>{
            state.otherUsers=action.payload
        },


    }

})

export const {setUserData, setOtherUsers}=UserSlice.actions

export default UserSlice.reducer