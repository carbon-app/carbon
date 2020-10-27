import firebase from 'firebase/app'
import 'firebase/auth'

if (firebase.apps.length === 0) {
  if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_FE_APP_ID) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_FE_APP_ID,
    })
  }
}

export function logout() {
  return firebase.auth().signOut().catch(console.error)
}

export function login(provider) {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(provider))
    .catch(console.error)
}

export function loginGitHub() {
  const provider = new firebase.auth.GithubAuthProvider()
  provider.setCustomParameters({
    allow_signup: 'true',
  })
  return login(provider)
}

export default firebase.apps.length ? firebase : null
