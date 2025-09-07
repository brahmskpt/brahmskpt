// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArc-PO8KACf3IiBxsmIpZJ0ROgQeW7OQA",
  authDomain: "brahmskpt.firebaseapp.com",
  projectId: "brahmskpt",
  storageBucket: "brahmskpt.appspot.com",
  messagingSenderId: "13551803320",
  appId: "1:13551803320:web:aec4758f076dde2d9b4d4d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
