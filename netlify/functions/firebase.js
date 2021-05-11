const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyDnbKx06RRW_V-P_C4fk4udshQUwSHHQ3Q",
  authDomain: "kiei-451-49dcd.firebaseapp.com",
  projectId: "kiei-451-49dcd",
  storageBucket: "kiei-451-49dcd.appspot.com",
  messagingSenderId: "34852354007",
  appId: "1:34852354007:web:01c4df0f988950f29bfd92"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase