import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
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

  firebase.initializeApp(firebaseConfig)


const app = createApp(App);
app.use(store)
app.use(router)
app.mount('#app')
