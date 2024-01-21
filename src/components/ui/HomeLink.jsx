import { Link } from 'react-router-dom';

export default function HomeLink() {
  return (
    <Link to="/">
      <span
        className="logo"
        title="Yuedpao Homepage"
        aria-label="Yuedpao Homepage"
      >
        Yuedpao
      </span>
    </Link>
  );
}
