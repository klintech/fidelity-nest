import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBLC4c1uIRDECIoX002i7lNCbeYd_zxuu0",
  authDomain: "fidelity-ffec7.firebaseapp.com",
  projectId: "fidelity-ffec7",
  storageBucket: "fidelity-ffec7.appspot.com", 
  messagingSenderId: "651747670301",
  appId: "1:651747670301:web:e3d0749c904a11b46749f4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
