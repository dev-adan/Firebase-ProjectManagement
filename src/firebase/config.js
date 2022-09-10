

import {initializeApp} from 'firebase/app';
import {getFirestore,serverTimestamp } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCuJHhDvRLOO0lyS_4tYwnXnNo4P7Di0AY",
  authDomain: "the-dojo-fb0f5.firebaseapp.com",
  projectId: "the-dojo-fb0f5",
  storageBucket: "the-dojo-fb0f5.appspot.com",
  messagingSenderId: "275390613357",
  appId: "1:275390613357:web:dc62a5c2cc292c6703fc64"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const timestamp = serverTimestamp;



export {db,auth,timestamp,storage }