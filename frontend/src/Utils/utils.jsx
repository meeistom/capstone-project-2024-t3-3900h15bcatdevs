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
  return date
    .toLocaleString('en-BG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
    .replace(',', '');
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
