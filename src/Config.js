//import* as firebase from 'firebase'
import firebase from 'firebase'
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
export default firebase;
// Initialize Firebase