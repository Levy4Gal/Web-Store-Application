import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../../config/firebase-config";
import { Link } from "react-router-dom";

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
        props.setEmail(email)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      <div>
        <Link to={"/signup"}>
          <h1>Click here to Sign-Up </h1>
        </Link>
      </div>
    </div>
  );
}
