//import* as firebase from 'firebase'
import firebase from '../node_modules/firebase'
//import 'firebase/firestore';
//import 'firebase/storage';
const settings = {timestampsInSnapshots: true}
var firebaseConfig = {
    apiKey: "AIzaSyALRq7AE7mKIZHmLu9ZAlzHapQVLZWNFKs",
    authDomain: "partswanted-aa4f7.firebaseapp.com",
    projectId: "partswanted-aa4f7",
    storageBucket: "partswanted-aa4f7.appspot.com",
    messagingSenderId: "127685850370",
    appId: "1:127685850370:web:73b2e506b40021f944fe1b",
    measurementId: "G-RT12YVG764"
  };
  
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);
//firebase.auth().settings(settings);
export default firebase;
// Initialize Firebase



const express = require('express');
const app = express();

const port = process.env.PORT || 3000;  // Use the PORT environment variable or fallback to port 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
