import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <button type="button" aria-label="close menu">
        ×
      </button>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/">Women</Link>
        <Link to="/">Men</Link>
        <Link to="/">Jewelry</Link>
        <Link to="/">Electronics</Link>
        <Link to="/">All Products</Link>
      </div>
    </nav>
  );
}
