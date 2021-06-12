import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCkvivSkDMoO9ed1dJr5tl5w6UDuYcpwXM",
  authDomain: "netflix-59f56.firebaseapp.com",
  projectId: "netflix-59f56",
  storageBucket: "netflix-59f56.appspot.com",
  messagingSenderId: "618031288235",
  appId: "1:618031288235:web:037f2853ff61f6fe448cee",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, provider };
