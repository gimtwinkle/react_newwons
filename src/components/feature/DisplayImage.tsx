import { storage } from '@/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

const fetchImageUrl = async (imageName: string) => {
  const imageRef = ref(storage, `images/${imageName}`); // 저장된 이미지의 경로
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error('이미지 불러오기 실패:', error);
  }
};

const DisplayImage = ({ imageName }: { imageName: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await fetchImageUrl(imageName);
        setImageUrl(url); // 이미지 URL 상태에 저장
      } catch (error) {
        console.error('이미지 로드 실패:', error);
      }
    };

    loadImage();
  }, [imageName]); // imageName이 변경될 때마다 이미지 URL을 다시 로드

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="Uploaded" /> : <div>이미지를 로드하는 중...</div>}
    </div>
  );
};

export default DisplayImage;
