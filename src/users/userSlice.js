import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const initialState = [];
export const usersFetch = createAsyncThunk("fetch/usersFetch", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
    .addCase(usersFetch.fulfilled , (state , action) =>{
      return action.payload
    })
  }
});

export const selectAllUser = (state) => state.users;

export default userSlice.reducer;
