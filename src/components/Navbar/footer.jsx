import "./footer.scss";
const Footer = () => {
    return (
        <footer>
            <div className="footer_content">
                <div className="upper_footer">
                    <div className="upper_footer_left">
                        <img className="footer_logo" src="/logo.png" alt="INRisk Logo" height={40} />
                        <p>INRisk let you analyse your Risk and give better understanding of your Future.</p>
                    </div>
                    <div className="upper_footer_right">
                        <a href="">+91 6389943455</a>
                        <span>inrisk.official@gmail.com</span>
                        <div className="social_icons">
                            <img className="invert_color" src="/social/x.png" alt="INRisk Logo" height={20} />
                            <img className="invert_color" src="/social/instagram.png" alt="INRisk Logo" height={20} />
                            <img className="invert_color" src="/social/youtube.png" alt="INRisk Logo" height={20} />
                            <img className="invert_color" src="/social/facebook.png" alt="INRisk Logo" height={20} />
                        </div>
                    </div>
                </div>
                <div className="lower_footer">
                    <nav className="lower_footer_items">
                        <a href="#">Terms Of Use</a>
                        <a href="#">Services</a>
                        <a href="#">Pricing</a>
                        <a href="#">Contact</a>
                    </nav>
                    <div className="copyright_content">
                        <p>&copy; 2024 INRisk. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer