import { useSelector } from "react-redux";
import React from "react";
import { selectAllPost } from "./postSlice";
import PostAuthor from "./PostAuthor";

const PostList = () => {
  const posts = useSelector(selectAllPost);
  const renderPost = posts.map((item, idx) => (
    <article key={idx} className={"posts_card"}>
      <h3>{item.title}</h3>
      <p>{item.content.substring(0, 100)}</p>
      <PostAuthor userId={item.userId} />
    </article>
  ));
  return (
    <main>
      <h2>Posts</h2>
      <div className="posts_context">{renderPost}</div>
    </main>
  );
};

export default PostList;
