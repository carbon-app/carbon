import * as firebase from 'firebase/app'
import 'firebase/auth'

if (firebase.apps.length === 0) {
  if (process.env.FIREBASE_API_KEY && process.env.FIREBASE_FE_APP_ID) {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_FE_APP_ID
    })
  }
}

export function logout() {
  return firebase
    .auth()
    .signOut()
    .catch(console.error)
}

export function login(provider) {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(provider))
    .catch(console.error)
}

export default firebase.apps.length ? firebase : null
