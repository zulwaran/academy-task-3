import firebase from 'firebase'

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
const listsCollection = db.collection('lists')
const tasksCollection = db.collection('tasks')
const usersCollection = db.collection('users')

export const createUser = user => {return usersCollection.add(user)}
export const createList = list => { return listsCollection.add(list) }
export const createTask = task => { return tasksCollection.add(task) }
export const getUser = async id => {
    const user = await usersCollection.doc(id).get()
    console.log(user.data())
    return user.exists ? user.data() : null
}




