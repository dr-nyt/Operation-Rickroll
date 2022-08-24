import '../styles/App.scss';

function App() {
  return (
    <div className="App">
      <div className="login_wrapper">

        <div className="scroller email_scroller">
          <div className="input_wrapper">
            <input type="email" name="email" id="email" />
            <label htmlFor="email" id="email_label">Email</label>
            <button id="next">Next</button>
          </div>
        </div>

        <div className="scroller password_scroller">
          <div className="input_wrapper">
            <input type="email" name="email" id="email" />
            <label htmlFor="email" id="email_label">Email</label>
            <button id="next">Login</button>
          </div>
        </div>

        <a href="/" id="forgot">Forgot Password?</a>
      </div>
    </div>
  );
}

export default App;
