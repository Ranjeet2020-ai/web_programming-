import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Media Gallery
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
