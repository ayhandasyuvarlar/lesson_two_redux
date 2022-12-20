import React from "react";
import PostAuthor from "./PostAuthor";
import Time from "./Time";
import ReactionButton from "./Reaction";
const PostsExcerpt = ({ post }) => {
  return (
    <div>
      <article className={"posts_card"}>
        <h3>{post.title}</h3>
        
        <PostAuthor userId={post.userId} />
        <Time timestamp={post.date} />
        <ReactionButton post={post} />
      </article>
    </div>
  );
};

export default PostsExcerpt;
