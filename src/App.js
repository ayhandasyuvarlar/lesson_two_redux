import React from "react";
import CreatePostsForm from "./features/createPostsForm";
import PostList from "./post/PostList";

const App = () => {
  return (
    <div className="App"> 
      <CreatePostsForm/>
      <PostList/>
    </div>
  );
};

export default App;
