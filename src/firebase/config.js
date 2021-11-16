import firebase from 'firebase/app'
import 'firebase/storage'
// import 'firebase/firestore'

// Firebase configuration
var firebaseConfig = {
  /// EXAMPLE ///
  // apiKey: "AIzaSyAEdpoPAiRFZB2kJ-IubzyKMeYnVjGfuBI",
  // authDomain: "mfast-admin-8ae65.firebaseapp.com",
  // projectId: "mfast-admin-8ae65",
  // storageBucket: "mfast-admin-8ae65.appspot.com",
  // messagingSenderId: "286495426152",
  // appId: "1:286495426152:web:10d2d1b6c8d871b04f9ddd",
  // measurementId: "G-MZG2WBC3D2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize storage
const imageStorage = firebase.storage();

// Initialize firestore
// const projectFirestore = firebase.firestore();

export { imageStorage }