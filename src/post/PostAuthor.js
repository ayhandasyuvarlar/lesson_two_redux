import { useSelector } from "react-redux";
import { selectAllUser } from "../users/userSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUser);
  //this variable name is author get user
  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;
