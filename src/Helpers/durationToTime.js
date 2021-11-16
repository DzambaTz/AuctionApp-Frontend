export default function durationToTime(duration) {
  let result = "";
  if (duration.indexOf("H") != -1) {
    result += duration.substring(3, duration.indexOf("H"));
    result += " hours";
  } else if (duration.indexOf("M") != -1) {
    result += duration.substring(3, duration.indexOf("M"));
    result += " minutes";
  }
  return result;
}
