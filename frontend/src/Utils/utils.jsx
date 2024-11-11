export const toUnix = (dateTime) => {
  const date = new Date(dateTime);
  return Math.floor(date.getTime() / 1000);
};

export const dateTimeToString = (dateTime) => {
  const [date, time] = dateTime.split("T");
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year} ${time}`;
};

export const unixToTimeStr = (unixTime) => {
  const date = new Date(unixTime * 1000);
  return date.toLocaleString();
}