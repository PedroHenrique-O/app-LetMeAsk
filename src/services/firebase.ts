
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_API_DATA_BASE_URL,
  projectId: process.env.REACT_APP_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;





