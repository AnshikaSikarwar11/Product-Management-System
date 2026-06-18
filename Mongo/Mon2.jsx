import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Mon2.css";

function Mon2() {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          uname,
          pass,
        }
      );

      if (res.data.message === "Login Successful") {

        localStorage.setItem("token", res.data.token);

        alert("Login Successful");

        navigate("/addproduct");

      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">

      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button onClick={login}>Login</button>

    </div>
  );
}

export default Mon2;