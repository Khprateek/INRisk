import "./footer.scss";
const Footer = () => {
    return (
        <div className="foot_container">
            <img className="footer_logo" src="/logo.png" alt="INRisk Logo" height={40} />
            <nav className="footer_content">
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Pricing</a>
                <a href="#">Contact</a>
                <a href="#">Careers</a>
            </nav>
            <div className="social_icons">
                <img className ="invert_color" src="/social/x.png" alt="INRisk Logo" height={25} />
                <img className ="invert_color" src="/social/instagram.png" alt="INRisk Logo" height={25} />
                <img className ="invert_color" src="/social/youtube.png" alt="INRisk Logo" height={25} />
                <img className ="invert_color"  src="/social/facebook.png" alt="INRisk Logo" height={25} />
            </div>
            <div className="copyright_content">
                <p>&copy; 2024 INRisk. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer