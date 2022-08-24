import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import '../styles/App.scss';

function App() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [isNext, setIsNext] = useState(false);

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
    setIsNext(true);
    setTimeout(() => passwordRef.current?.focus(), 500);
  }

  const login = () => {

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
            <label htmlFor="password" id="password_label">Passowrd</label>
            <button id="login">Login</button>
            <a href="/" id="forgot">Forgot Password?</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
