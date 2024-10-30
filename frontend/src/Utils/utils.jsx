export function toUnix(dateTime) {
  const date = new Date(dateTime);
  return Math.floor(date.getTime() / 1000);
}
