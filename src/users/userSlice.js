import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    name: "Ayhan Daşyuvarlar",
  },
  {
    id: 1,
    name: "Ahmet Keskin",
  },
  {
    id: 2,
    name: "Furkan Taşlıca",
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUser = (state) => state.users;

export default userSlice.reducer;
