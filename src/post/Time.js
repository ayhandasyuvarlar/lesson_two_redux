import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns/esm";
import React from "react";

export default function Time({ timestamp }) {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const datePeriod = formatDistanceToNow(date);
    timeAgo = `${datePeriod} ago`;
  }
  return (
    <span>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}
