import PostInfoGroup from '@/components/feature/PostInfoGroup';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Detail = async () => {
  //특정 단일 data 가져오기(문서번호는 전체 데이터 가져오는 리스트 쪽에서 확인할 수 있을 것 같아요.)
  try {
    const docRef = doc(db, 'newwons');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <PostInfoGroup
        title="Post Title"
        category="category"
        author="author"
        timestamp="a minutes ago"
        href="/"
      />
    </>
  );
};

export default Detail;
