import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../post/postSlice";
import { selectAllUser, usersFetch } from "../users/userSlice";
import UserExcerpt from "./UserExcerpt";
const CreatePostsForm = () => {
  const [title, setTitle] = useState("");
  const [contain, setContain] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUser);

  const dispatch = useDispatch();
  const canSave =
    [title, contain, userId].every(Boolean) && addRequestStatus === "idle";
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: contain, userId })).unwrap();
        setTitle("");
        setContain("");
        setUserId("");
      } catch (error) {
        console.log("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  const onAuthorChanged = (e) => setUserId(e.target.value);
  useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);

  const content = users.map((user) => (
    <UserExcerpt user={user} key={user.id} />
  ));
  return (
    <section className="create_form_context">
      <form action="/#">
        <div className="form-group">
          <label htmlFor="posts-title">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-user">User</label>
          <select value={userId} onChange={onAuthorChanged} id="postAuthor">
            <option value=""></option>
            {content}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="post-contain">Post Contain</label>
          <input
            type="text"
            value={contain}
            onChange={(e) => {
              setContain(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePostsForm;
