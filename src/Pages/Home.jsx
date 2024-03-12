import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import googleButton from "../Assets/google.png";
const Home = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(true);

  const provider = new GoogleAuthProvider();

  const handleMethodChange = () => {
    setIsSignUpActive((prev) => !prev);
  };

  const handleSignUp = () => {
    setEmail("");
    setPassword("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    setEmail("");
    setPassword("");
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  if (user) {
    return <Navigate to="/private"></Navigate>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mx-auto mt-5">
          <div className="card">
            <div className="card-title">
              {isSignUpActive ? (
                <p className="fw-bold h4 ms-3 mt-4">Sign Up</p>
              ) : (
                <p className="fw-bold h4 ms-3 mt-4">Sign in</p>
              )}
            </div>
            <div className="card-body">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="Enter mail"
                className="form-control mb-2"
              />
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                placeholder="Enter password"
                className="form-control mb-2"
              />
              {isSignUpActive && (
                <button
                  className="button-confirm btn btn-primary"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              )}
              {!isSignUpActive && (
                <button
                  className="button-confirm btn btn-primary"
                  onClick={handleSignIn}
                >
                  Sign in
                </button>
              )}
              {isSignUpActive ? (
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-outline-light text-dark"
                >
                  <img src={googleButton} alt="google button" />
                  <span className="ms-1">Google</span>
                </button>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-outline-light text-dark"
                >
                  <img src={googleButton} alt="google button" />
                  <span className="ms-1">Google</span>
                </button>
              )}
              <p onClick={handleMethodChange} className="mt-1 cursor-pointer">
                {isSignUpActive ? "Login" : "create an account"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
