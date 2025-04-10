import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (publishDate: string) => {
  return `${formatDistanceToNow(new Date(publishDate))} ago`;
};
