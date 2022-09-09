
import {initializeApp} from 'firebase/app';
import {getFirestore,serverTimestamp } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCqj60kqq-XFpyUxufyCAOZKH4pAOHj0-k",
  authDomain: "thedojosite-5d879.firebaseapp.com",
  projectId: "thedojosite-5d879",
  storageBucket: "thedojosite-5d879.appspot.com",
  messagingSenderId: "442371744615",
  appId: "1:442371744615:web:45ed33f4affffdc1d645c2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const timestamp = serverTimestamp;



export {db,auth,timestamp }