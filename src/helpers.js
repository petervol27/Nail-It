import { Timestamp } from 'firebase/firestore';

export const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const timeAgo = (timestamp) => {
  const now = new Date();
  const createdDate =
    timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  const diffMs = now - createdDate;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};
