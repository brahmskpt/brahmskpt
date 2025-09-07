import { auth } from "../firebase-config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// ---------------- SIGN UP ----------------
const signupForm = document.querySelector("#signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const msg = document.querySelector("#auth-msg");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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

// ---------------- LOGOUT ----------------
const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("Logged out!");
    window.location.href = "login.html";
  });
}
