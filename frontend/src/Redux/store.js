import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserSlice.js'

export const store=configureStore({
    reducer:{
        user:UserReducer
    }
})