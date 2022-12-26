import React from "react";

export default function UserExcerpt({ user }) {
  return <option value={user.id}>{user.name}</option>;
}
