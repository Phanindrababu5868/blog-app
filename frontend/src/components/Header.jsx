import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const navigate = useNavigate();

  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/login");
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <button onClick={() => navigate("/create")} title="create new post">
              Add Post
            </button>
            <button onClick={logout}>Logout ({username})</button>
          </>
        )}
        {!username && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </nav>
    </header>
  );
}
