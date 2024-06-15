import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtWBHPAJny-tCbxUfiX4X_MxUHgDJqp4o",
  authDomain: "login-to-goggle.firebaseapp.com",
  databaseURL: "https://login-to-goggle-default-rtdb.firebaseio.com",
  projectId: "login-to-goggle",
  storageBucket: "login-to-goggle.appspot.com",
  messagingSenderId: "811359604956",
  appId: "1:811359604956:web:f450ac3f220ec37ad3a419",
  measurementId: "G-WP97F5PT4S"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', (event) => {
  const signupButton = document.getElementById("signup-button");
  const signinButton = document.getElementById("signin-button");

  if (signupButton) {
    signupButton.addEventListener("click", (e) => {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let nohp = document.getElementById("nohp").value;
      let emailSignup = document.getElementById("email_signup").value;
      let passwordSignup = document.getElementById("psw_signup").value;
      
      createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
        .then((userCredential) => {
          const user = userCredential.user;

          set(ref(database, "users/" + user.uid), {
            name: name,
            nohp: nohp,
            email: emailSignup,
            password: passwordSignup
          })
          .then(() => {
            alert("User has been successfully created.");
            window.location.href = 'login.html';
          })
          .catch((error) => {
            alert("Error saving user data: " + error.message);
          });
        })
        .catch((error) => {
          alert("Error creating user: " + error.message);
        });
    });
  }

  if (signinButton) {
    signinButton.addEventListener("click", (e) => {
      e.preventDefault();

      let emailSignin = document.getElementById("email_signin").value;
      let passwordSignin = document.getElementById("psw_signin").value;

      signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
        .then((userCredential) => {
          const user = userCredential.user;
          let lgDate = new Date();
          update(ref(database, "users/" + user.uid), {
            last_login: lgDate
          })
          .then(() => {
            alert("User has been successfully logged in.");
            window.location.href = 'admin.html';
          })
          .catch((error) => {
            alert("Error updating user datza: " + error.message);
          });
        })
        .catch((error) => {
          alert("Error signing in: " + error.message);
        });
    });
  }
});
