import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    login(username, password).then(() => {
      navigate("/admin");
      window.location.reload();
    });
  };
  return (
    <div className="login-form">
      <form>
        <input
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Användarnamn..."
        />
        <input
          name="password"
          type="password"
          placeholder="Lösenord..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" onClick={handleLogin} />
      </form>
    </div>
  );
};

export default Login;
