import { auth } from "../firebase-config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// ---------------- SIGN UP ----------------
const signupForm = document.querySelector("#signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value.trim(); // Added name input
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const msg = document.querySelector("#auth-msg");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save display name
      await updateProfile(userCredential.user, { displayName: name });

      msg.style.color = "green";
      msg.textContent = "Signup successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } catch (error) {
      msg.style.color = "red";
      msg.textContent = error.message;
    }
  });
}

// ---------------- LOGIN ----------------
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#lemail").value.trim();
    const password = document.querySelector("#lpassword").value.trim();
    const msg = document.querySelector("#auth-msg");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      msg.style.color = "green";
      msg.textContent = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } catch (error) {
      msg.style.color = "red";
      msg.textContent = error.message;
    }
  });
}

// ---------------- DASHBOARD USER INFO ----------------
const pnameEl = document.getElementById("pname");
const pemailEl = document.getElementById("pemail");
const puidEl = document.getElementById("puid");
const welcomeEl = document.getElementById("welcome");

onAuthStateChanged(auth, (user) => {
  if (user) {
    pnameEl.textContent = user.displayName || "User";
    pemailEl.textContent = user.email;
    puidEl.textContent = user.uid;
    welcomeEl.textContent = `Welcome, ${user.displayName || "User"}!`;
  } else {
    window.location.href = "login.html";
  }
});

// ---------------- LOGOUT ----------------
const logoutBtn = document.querySelector("#logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "login.html";
    } catch (error) {
      console.error("Logout error:", error);
    }
  });
}
