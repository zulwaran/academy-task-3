import firebase from 'firebase/app'
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".firebaseapp.com",
    databaseURL: "https://" + process.env.VUE_APP_FIREBASE_PROJECT_ID + "-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".appspot.com",
    messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig)


export const db = firebaseApp.firestore()
const usersCollection = db.collection('users')


export const createUser = user => { return usersCollection.add(user) }





