import {createSlice} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        },
        removeUserFromFeed:(state,action)=>{
            const newUser = state.filter( (user)=> user._id !== action.payload)
            return newUser
        }
    }
})

export const {addFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;