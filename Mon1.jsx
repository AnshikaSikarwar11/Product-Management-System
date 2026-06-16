import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Mon1.css";

function Mon1() {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/register",
        {
          uname,
          pass,
        }
      );

      alert(res.data.message);

      if (res.data.message === "Registration Successful") {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

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

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Mon1;