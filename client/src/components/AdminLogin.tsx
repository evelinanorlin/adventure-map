import { Link } from "react-router-dom";
import close from "/icons/close.svg";
import { useState } from "react";
import { checkLogin } from "../services/loginServices";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const loggedIn = localStorage.getItem("admin");

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await checkLogin(username, password);
    console.log(response);
    if(response == "No user"){
      setUsernameError(true);
    } else if(response == "Wrong password"){
      setUsernameError(false);
      setPasswordError(true);
    } else if(response == "Success"){
      console.log("logged in!")
      localStorage.setItem("admin", "true");
      window.location.reload();
    }
  }

  if(!loggedIn){
    return (
      <section>
        <div className="popup login-popup p-5">
        <Link to="/" className="close-btn">
              <img src={close} alt="close" className="close" />
        </Link>
         <h1 className="p-t-5">Logga in</h1>
         <form onSubmit={login}>
          <label>
            <p>Användarnamn</p>
            <p className="error-message" style={usernameError ? {display: "block"} : {display: "none"}}>Användarnamnet hittades inte</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
          </label>
          <label>
            <p>Lösenord</p>
            <p className="error-message" style={passwordError ? {display: "block"} : {display: "none"}}>Fel lösenord</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit" className="btn btn-primary m-t-5">Logga in</button>
          </label>
         </form>
        </div>
      </section>
    );
  } else {
    return(
      <section>
        <div className="popup login-popup p-5">
          <Link to="/" className="close-btn">
                <img src={close} alt="close" className="close" />
          </Link>
          <h1 className="p-t-5">Logga in</h1>
          <p>Du är inloggad!</p>
        </div>
      </section>
    )
  }
}
