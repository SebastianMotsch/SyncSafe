import { Link } from "react-router-dom";

const UrlSidebar = () => {
    return (
    <nav>
        <ul>
            <li><Link to="/maininfo">INFO<div className="nav-icon"><img src="src/images/info_icon.png" alt="Info Icon" /></div></Link></li>
            <li><Link to="/scanner">SCANNER<div className="nav-icon"><img src="src/images/scanner_icon.png" alt="Scanner Icon" /></div></Link></li>
            <li><Link to="/faq">FAQs<div className="nav-icon"><img src="src/images/faq_icon.png" alt="FAQ Icon" /></div></Link></li>
            <li><Link to="/services">SERVICES<div className="nav-icon"><img src="src/images/services_icon.png" alt="Services Icon" /></div></Link></li>
            <li><Link to="/contact">CONTACT<div className="nav-icon"><img src="src/images/contact_icon.png" alt="Contact Icon" /></div></Link></li>
        </ul>
    </nav>
    )
}

export default UrlSidebar;