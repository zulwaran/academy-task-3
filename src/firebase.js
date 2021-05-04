import firebase from 'firebase/app'
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAYDMajV7G4NupPZzeXLU4d3dkc8M50UqQ",
    authDomain: "academy-task-3.firebaseapp.com",
    databaseURL: "https://academy-task-3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "academy-task-3",
    storageBucket: "academy-task-3.appspot.com",
    messagingSenderId: "1062326428640",
    appId: "1:1062326428640:web:9cb3748eb4fc6690348185"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {return usersCollection.add(user)}





