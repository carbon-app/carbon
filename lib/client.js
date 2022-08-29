import { getApps, initializeApp } from "firebase/app";
import { getAuth, signOut , setPersistence , browserLocalPersistence , signInWithPopup , GithubAuthProvider , onAuthStateChanged} from 'firebase/auth';


const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_FE_APP_ID,
      };

let FirebaseApp , auth

if(getApps().length === 0 )
{
if(typeof process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "undefined" && typeof process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== "undefined" )
{
FirebaseApp = initializeApp(firebaseConfig)
auth = getAuth(FirebaseApp)
}
}

export function logout() {
  return signOut(auth).then(() => {
      // Sign out successful
  }).catch((error) => {
      console.log(error)
  });
}

export function login(provider) {
  return setPersistence(auth, browserLocalPersistence)
    .then(() => signInWithPopup(auth, provider))
    .catch(console.error)
}

export function loginGitHub() {
  const provider = new GithubAuthProvider()
  provider.setCustomParameters({
    allow_signup: 'true',
  })
  return login(provider)
}

export default FirebaseApp 
