// BRAHMSKPT site logic + Firebase Auth/Firestore
import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc, setDoc, getDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const byId = (id) => document.getElementById(id);

// Handle Sign Up
const signupForm = byId('signup-form');
if (signupForm){
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = byId('name').value.trim();
    const email = byId('email').value.trim();
    const password = byId('password').value;

    const msg = byId('auth-msg');
    msg.textContent = 'Creating account…';

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email,
        createdAt: serverTimestamp()
      });
      msg.textContent = 'Success! Redirecting…';
      window.location.href = 'dashboard.html';
    } catch (err){
      console.error(err);
      msg.textContent = err.message || 'Signup failed.';
    }
  });
}

// Handle Login
const loginForm = byId('login-form');
if (loginForm){
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = byId('lemail').value.trim();
    const password = byId('lpassword').value;
    const msg = byId('auth-msg');
    msg.textContent = 'Signing in…';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'dashboard.html';
    } catch (err){
      console.error(err);
      msg.textContent = err.message || 'Login failed.';
    }
  });
}

// Handle Dashboard + Logout
const logoutBtn = byId('logout-btn');
const isDashboard = document.body.dataset.page === 'dashboard';

if (logoutBtn){
  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
  });
}

// Guarded route logic
onAuthStateChanged(auth, async (user) => {
  if (isDashboard){
    if (!user){
      // Not logged in -> redirect to login
      window.location.href = 'login.html';
      return;
    }
    // Logged in: load profile
    const welcome = byId('welcome');
    const pname = byId('pname');
    const pemail = byId('pemail');
    const puid = byId('puid');
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      const data = snap.exists() ? snap.data() : { name: user.displayName || 'User' };
      welcome.textContent = `Hello, ${data.name || 'there'} 👋`;
      pname.textContent = data.name || '—';
      pemail.textContent = user.email || '—';
      puid.textContent = user.uid || '—';
    } catch (err){
      console.error(err);
      welcome.textContent = 'Could not load your profile.';
    }
  }
});
