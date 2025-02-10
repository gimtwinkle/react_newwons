'use client';
import { useState } from 'react';

export const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const [attachment, setAttachment] = useState('');

  setAttachment(e.target.value);
  const { files } = e.target;
  if (!files || files.length === 0) return;

  const theFile = files[0];
  const reader = new FileReader();

  if (theFile.size > 512000) {
    alert('500KB 이하로 업로드해주세요. 무료할당끝나면 유료라..😂(카드연결되어있음)');
    return;
  } else {
    alert('첨부완료!');
  }

  reader.onloadend = (finishedEvent) => {
    if (finishedEvent.target && finishedEvent.target.result) {
      setAttachment(finishedEvent.target.result as string);
    } else {
      console.error('FileReader result is null');
    }
  };

  reader.readAsDataURL(theFile);
};

export const onClearAttachment = () => {
  const [attachment, setAttachment] = useState('');
  setAttachment('');
};
