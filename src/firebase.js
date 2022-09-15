import firebase from "firebase"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyARyxUhd89sHKzy5X2G1KukxRcE1kM8Fkg",
  authDomain: "todolistapp-82d89.firebaseapp.com",
  projectId: "todolistapp-82d89",
  storageBucket: "todolistapp-82d89.appspot.com",
  messagingSenderId: "328938551186",
  appId: "1:328938551186:web:50ce4bc962d0346cc6b34b",
  measurementId: "G-E135HN22XL"
})

export const auth = app.auth()
export const db = firebase.firestore();
export default app
