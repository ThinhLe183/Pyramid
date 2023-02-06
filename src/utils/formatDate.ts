export const formatTime = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - new Date(timestamp).getTime();

  if (diff < 60000) {
    // 60 seconds * 1000 milliseconds
    return "·now";
  } else if (diff < 3600000) {
    // 60 minutes * 60 seconds * 1000 milliseconds
    return `·${Math.floor(diff / 60000)}m`;
  } else if (diff < 86400000) {
    // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    return `·${Math.floor(diff / 3600000)}h`;
  } else if (diff < 604800000) {
    // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    return `·${Math.floor(diff / 86400000)}d`;
  } else if (diff < 31536000000) {
    // 365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    return `·${Math.floor(diff / 604800000)}w`;
  } else {
    return `·${Math.floor(diff / 31536000000)}y`;
  }
};
