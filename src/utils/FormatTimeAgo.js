import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (publishDate) => {
  return `${formatDistanceToNow(new Date(publishDate))} ago`;
};
