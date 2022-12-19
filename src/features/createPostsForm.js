import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../post/postSlice";
import { selectAllUser } from "../users/userSlice";
const CreatePostsForm = () => {
  const [title, setTitle] = useState("");
  const [contain, setContain] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUser);
  const dispatch = useDispatch();
  const onSavePostClicked = () => {
    if (title && contain) {
      dispatch(postAdded(title, contain, parseInt(userId)));
      setTitle("");
      setContain("");
      setUserId('')
    }
  };
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  const canSave = Boolean(title) && Boolean(contain) && Boolean(userId)
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
            {usersOptions}
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
