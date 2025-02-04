export const getCurrentTime = (): string => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours());
  const minutes = String(date.getHours());

  return `${year}.${month}.${day} ${hour}:${minutes}`;
};
