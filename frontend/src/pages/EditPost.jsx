// import { useEffect, useState } from "react";
// import { Navigate, useParams } from "react-router-dom";
// import Editor from "../components/Editor";

// export default function EditPost() {
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [content, setContent] = useState("");
//   const [files, setFiles] = useState("");
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/posts/" + id).then((response) => {
//       response.json().then((postInfo) => {
//         setTitle(postInfo.title);
//         setContent(postInfo.content);
//         setSummary(postInfo.summary);
//       });
//     });
//   }, []);

//   async function updatePost(ev) {
//     ev.preventDefault();
//     const data = new FormData();
//     data.set("title", title);
//     data.set("summary", summary);
//     data.set("content", content);
//     data.set("id", id);
//     if (files?.[0]) {
//       data.set("file", files?.[0]);
//     }
//     console.log(data);
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
//       method: "PUT",
//       body: data,
//       credentials: "include",
//     });
//     if (response.ok) {
//       setRedirect(true);
//     }
//   }

//   if (redirect) {
//     return <Navigate to={"/post/" + id} />;
//   }

//   return (
//     <form onSubmit={updatePost}>
//       <input
//         type="title"
//         placeholder={"Title"}
//         value={title}
//         onChange={(ev) => setTitle(ev.target.value)}
//       />
//       <input
//         type="summary"
//         placeholder={"Summary"}
//         value={summary}
//         onChange={(ev) => setSummary(ev.target.value)}
//       />
//       <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
//       <Editor onChange={setContent} value={content} />
//       <button style={{ marginTop: "5px" }}>Update post</button>
//     </form>
//   );
// }

import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/posts/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch post data");
        setLoading(false);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        setError("Failed to update post");
      }
    } catch (err) {
      setError("An error occurred while updating the post");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        required
      />
      <input
        type="file"
        onChange={(ev) => setFiles(ev.target.files)}
        required
      />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
