import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserSlice.js'
import messageReducer from './MessageSlice.js'

export const store=configureStore({
    reducer:{
        user:UserReducer,
        message:messageReducer
    }
})