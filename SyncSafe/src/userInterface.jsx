function UrlLink() {
    return (
    <div className="container"> <ul>
        <li><a href="maininfo.html">INFO<div className="nav-icon"><img src="images/info_icon.png" alt="Info Icon" /></div></a></li>
        <li><a href="scanner.html">SCANNER<div className="nav-icon"><img src="images/scanner_icon.png" alt="Scanner Icon" /></div></a></li>
        <li><a href="faq.html">FAQs<div className="nav-icon"><img src="images/faq_icon.png" alt="FAQ Icon" /></div></a></li>
        <li><a href="#">SERVICES<div className="nav-icon"><img src="images/services_icon.png" alt="Services Icon" /></div></a></li>
        <li><a href="#">CONTACT<div className="nav-icon"><img src="images/contact_icon.png" alt="Contact Icon" /></div></a></li>
    </ul> </div>
    )
}

function Footer() {
    return (
    <>
    <p> &copy; CI 102 - Team 6 - IoT Device Vulnerability Scanner. All rights reserved.</p>
    </>
    )
}

function PageSetup() {
    return (
    <>

    <nav>
        <UrlLink />
    </nav>

    <footer>
        <Footer />
    </footer>
    </>
    )
}

export default PageSetup