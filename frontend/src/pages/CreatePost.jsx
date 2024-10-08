import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  async function createNewPost(ev) {
    setLoading(true);
    ev.preventDefault();
    try {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("file", files[0]);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
      }
    } catch (err) {
      alert("Creation failed");
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <h1 style={{ textAlign: "center", marginBottom: "16px" }}>
        Create New Post
      </h1>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(ev) => setFiles(ev.target.files)}
        required
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }} disabled={loading}>
        {" "}
        {loading ? "Creating..." : "Create post"}
      </button>
    </form>
  );
}
