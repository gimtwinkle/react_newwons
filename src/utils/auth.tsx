import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import app from './../firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
//로그인(구글)
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
export const googleAuth = () => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const name = result.user.displayName;
          alert(`${name}님! 안녕하세요!`);
          window.location.href = '/';
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

//로그아웃(구글)
export const logout = () => {
  signOut(auth)
    .then(() => {
      alert('또 오세요!');
    })
    .catch((error) => {
      console.log(error);
    });
};

//로그인 여부 체크
export const isLoggedIn = () => {
  if (sessionStorage.length) {
    return true;
  } else {
    return false;
  }
};
