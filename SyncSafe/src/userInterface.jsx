function Header() {
    return (
    <header>
        <div className="logo-container">
            <img src="src/images/syncsafe_logo.png" alt="SyncSafe Logo" className="logo" />
        </div>
    </header>
    )
}

function UrlLink() {
    return (
    <ul>
        <li><a href="maininfo.html">INFO<div className="nav-icon"><img src="src/images/info_icon.png" alt="Info Icon" /></div></a></li>
        <li><a href="scanner.html">SCANNER<div className="nav-icon"><img src="src/images/scanner_icon.png" alt="Scanner Icon" /></div></a></li>
        <li><a href="faq.html">FAQs<div className="nav-icon"><img src="src/images/faq_icon.png" alt="FAQ Icon" /></div></a></li>
        <li><a href="#">SERVICES<div className="nav-icon"><img src="src/images/services_icon.png" alt="Services Icon" /></div></a></li>
        <li><a href="#">CONTACT<div className="nav-icon"><img src="src/images/contact_icon.png" alt="Contact Icon" /></div></a></li>
    </ul>
    )
}

function Footer() {
    return (
    <footer>
    <p> &copy; CI 102 - Team 6 - IoT Device Vulnerability Scanner. All rights reserved.</p>
    </footer>
    )
}

function PageSetup() {
    return (
    <>
    <Header />

    <nav>
        <UrlLink />
    </nav>

    
    <Footer />
    </>
    )
}

export default PageSetup