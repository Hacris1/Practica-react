import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}`}>Ver detalles</Link>
    </div>
  );
}
