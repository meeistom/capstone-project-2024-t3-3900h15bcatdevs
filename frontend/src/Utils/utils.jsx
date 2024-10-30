export const toUnix = (dateTime) => {
  const date = new Date(dateTime);
  return Math.floor(date.getTime() / 1000);
};

export const dateTimeToString = (dateTime) => {
  console.log(dateTime);
  const [date, time] = dateTime.split("T");
  console.log(date, time);
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year} ${time}`;
};
