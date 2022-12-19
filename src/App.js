import React from "react";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const data = useSelector((state) => state.post);
  console.log(data);
  return <div>{
    JSON.stringify(data)
  }
  </div>;
};

export default App;
