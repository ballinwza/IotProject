import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD7ZL08Ch9hBM7jh6xw6eLbaN-J4sUyxLk",
    authDomain: "iotardtech.firebaseapp.com",
    databaseURL: "https://iotardtech.firebaseio.com",
    projectId: "iotardtech",
    storageBucket: "iotardtech.appspot.com",
    messagingSenderId: "629820889543",
    appId: "1:629820889543:web:1d878e2b0802dc2abae1e2"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({timestampsInSnapshots: true});//update about timestamp thingy


export default firebaseApp;

