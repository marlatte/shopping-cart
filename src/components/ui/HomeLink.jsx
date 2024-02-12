import { Link } from 'react-router-dom';
import { homeLink } from './styles/homeLink.module.css';

export default function HomeLink() {
  return (
    <Link to="/" className={homeLink}>
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
