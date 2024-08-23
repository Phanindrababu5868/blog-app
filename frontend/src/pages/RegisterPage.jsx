import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        }
      );
      setIsLoading(false);

      if (response.ok) {
        alert("Registration successful");
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      setIsLoading(false);
      alert(`Registration failed: ${error.message}`);
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1 style={{ marginBottom: "15px" }}>Register</h1>
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
        {isLoading ? "Registering..." : "Register"}
      </button>
      <p style={{ marginTop: "10px" }}>
        Already have account?{" "}
        <a
          onClick={() => navigate("/login")}
          style={{
            textDecoration: "underline",
            color: "#0000ff",
          }}
        >
          Login
        </a>
      </p>
    </form>
  );
}
