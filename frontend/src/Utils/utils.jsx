export const toUnix = (dateTime) => {
  const date = new Date(dateTime);
  return Math.floor(date.getTime() / 1000);
};

export const dateTimeToString = (dateTime) => {
  const [date, time] = dateTime.split('T');
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year} ${time}`;
};

export const unixToTimeStr = (unixTime) => {
  const date = new Date(unixTime * 1000);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};


export const getCurrentDateTime = () => {
  const date = new Date();
  date.setDate(date.getDate());
  return date.toISOString().slice(0, 16);
};

export const addDaysToDateTime = (dateTime, days) => {
  const date = new Date(dateTime);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 16);
};

export const unixToDatetimeLocal = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const formattedDate = date.toISOString().slice(0, 16);

  return formattedDate;
};