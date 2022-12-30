import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../../config/firebase-config";
import { Link } from "react-router-dom";
import SignUpIcon from "../../components/SignUpIcon";

export default function Signin(props) {
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
    const login = (e) => {
      e.preventDefault();
      fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email})
      };
        fetch('/api/users/signin', requestOptions)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <h1>Sign-In</h1>
      <form>
        <div>
          <label>Enter email </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <label>Enter password </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button onClick={login}>Click to sign-in</button>
      </form>
      <div style={{ paddingTop: "20px" }}>
        <Link to={"/signup"}>
          <SignUpIcon />
        </Link>
      </div>
    </div>
  );
}
