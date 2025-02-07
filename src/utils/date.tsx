import { Timestamp } from 'firebase/firestore';

export const getCurrentTime = (): string => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours());
  const minutes = String(date.getHours());

  return `${year}.${month}.${day} ${hour}:${minutes}`;
};

export const convertTimestamp = (dateData: Timestamp | null | undefined) => {
  if (!dateData) return '';
  const date = dateData.toDate();

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formatter.format(date);
};
