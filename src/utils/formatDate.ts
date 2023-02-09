import { DAY, HOUR, MINUTE, WEEK, YEAR } from "./constant";

export const formatTime = (ts: Date): string => {
  const now = new Date();
  const diff = now.getTime() - new Date(ts).getTime();

  if (diff < MINUTE) {
    return "·now";
  } else if (diff < HOUR) {
    return `·${Math.floor(diff / MINUTE)}m`;
  } else if (diff < DAY) {
    return `·${Math.floor(diff / HOUR)}h`;
  } else if (diff < WEEK) {
    return `·${Math.floor(diff / DAY)}d`;
  } else if (diff < YEAR) {
    return `·${Math.floor(diff / WEEK)}w`;
  } else {
    //more than a year
    return `·${Math.floor(diff / YEAR)}y`;
  }
};
