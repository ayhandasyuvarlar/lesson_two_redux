import { useSelector } from "react-redux";
import React from "react";
import { selectAllPost } from "./postSlice";
import PostAuthor from "./PostAuthor";
import Time from "./Time";
import ReactionButton from "./Reaction";

const PostList = () => {
  const posts = useSelector(selectAllPost);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderPost = orderedPosts.map((item, idx) => (
    <article key={idx} className={"posts_card"}>
      <h3>{item.title}</h3>
      <p>{item.content.substring(0, 100)}</p>
      <PostAuthor userId={item.userId} />
      <Time timestamp={item.date} />
        <ReactionButton post={item} />
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
