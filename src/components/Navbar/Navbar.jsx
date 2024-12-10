import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/logo.png" alt="INRisk Logo" />
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/RiskRuler" className="nav-link">Risk Ruler</Link>
        <Link to="/contacts" className="nav-link">Contacts</Link>
        <Link to="/Goldenway" className="button">
          <span>Golden Way</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
