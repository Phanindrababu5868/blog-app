import { formatISO9075 } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="post"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/post/${_id}`);
      }}
    >
      <div className="image">
        <img src={cover} alt="" />
      </div>
      <div className="texts">
        <h2>{title}</h2>

        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">
          {summary.length > 250 ? `${summary.slice(0, 150)}...` : summary}
        </p>
      </div>
    </div>
  );
}
