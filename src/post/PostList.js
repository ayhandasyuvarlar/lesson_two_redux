import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  selectAllPost,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postSlice";
import PostAuthor from "./PostAuthor";
import Time from "./Time";
import ReactionButton from "./Reaction";
import PostsExcerpt from "./PostExcerpt";

const PostList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPost);
  const error = useSelector(getPostsError);
  const status = useSelector(getPostsStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);
  let content;
  if (status === 'loading') {
      content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
      const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
      content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
  } else if (status === 'failed') {
      content = <p>{error}</p>;
  }
  return (
    <main>
      <h2>Posts</h2>
      {content}
    </main>
  );
};

export default PostList;
