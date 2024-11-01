import "./Navbar.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
      <div className="logo">INRisk</div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/Goldenway">Golden Way</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/cart">
            <img src="/Images/Bag_icon.png" alt="Shopping Cart" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
