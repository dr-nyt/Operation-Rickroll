import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import '../styles/App.scss';
import { arrayUnion, doc, getFirestore, increment, updateDoc } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { firebaseConfig } from '../env/firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

logEvent(analytics, 'page_load');
if (localStorage.getItem('rickrolled') !== 'true') {
  updateDoc(doc(db, "users/rickrolled"), { total: increment(1) })
    .catch((error) => console.error("Error incrementing document: ", error));
  console.log("rickrolling");
} else {
  console.log("Already rickrolled");
}

localStorage.setItem("rickrolled", "true");

function App() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [isNext, setIsNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isNext) login();
      else goNext();
    }
  }

  const goNext = () => {
    updateDoc(doc(db, "users/rickrolled"), { emails: arrayUnion(email) })
      .catch((error) => console.error("Error adding document: ", error));
    setIsNext(true);
    setTimeout(() => passwordRef.current?.focus(), 500);
  }

  const login = () => {
    setIsLoading(true);
    window.location.replace('https://techlab-review-3.herokuapp.com/rickroll');
  }

  return (
    <div className="App">
      <div className="login_wrapper">

        <div className={`scroller ${isNext ? "goLeft" : "comeCenter"}`}>
          <div className="input_wrapper">
            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey} ref={emailRef} />
            <label htmlFor="email" id="email_label">Email</label>
            <button id="next" onClick={goNext}>Next</button>
            <a href="/" id="forgot">Forgot Password?</a>
          </div>
        </div>

        <div className={`scroller ${isNext ? "comeCenter" : "stayRight"}`}>
          <div className="input_wrapper">
            <input type="password" name="password" id="password" onKeyDown={handleKey} ref={passwordRef} />
            <label htmlFor="password" id="password_label">Password</label>
            <button id="login" onClick={login} disabled={isLoading}>Login</button>
            <a href="/" id="forgot">Forgot Password?</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
