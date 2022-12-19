import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Learning Redux Toolkit",
    content: " I've heard good things,",
    like : 5 ,
  },
  {
    id: 2,
    title: "Slices...",
    content: "I've heard good things,",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content,userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId
          },
        };
      },
    },
  },
});

export const selectAllPost = (state) => state.posts;
export const { postAdded } = postSlice.actions;
export default postSlice.reducer;
