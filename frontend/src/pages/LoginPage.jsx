import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function login(ev) {
    ev.preventDefault();
    setIsLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);

        setIsLoading(false);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
      setIsLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1 style={{ marginBottom: "10px" }}>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button style={{ width: "100%" }} disabled={isLoading}>
        {isLoading ? "Logging..." : "Login"}
      </button>
      <p style={{ marginTop: "10px" }}>
        Don't have have account?{" "}
        <a
          onClick={() => navigate("/register")}
          style={{
            textDecoration: "underline",
            color: "#0000ff",
          }}
        >
          Register
        </a>
      </p>
    </form>
  );
}
