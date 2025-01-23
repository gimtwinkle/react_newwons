import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import app from './../firebase';

//구글 로그인,
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/userinfo.email');
export const googleAuth = () => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const name = result.user.displayName;
          alert(`${name}님! 안녕하세요!`);
          //   window.location.href = '/';
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const isLoggedIn = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (user) {
    console.log('로그인상태');
    return true;
  } else {
    console.log('로그인안상태');
    return false;
  }
};
