import CreateSection from "./CreateSection"
import { Link } from "react-router-dom";

const ServicesSetup = () => {
    const [serviceClassName] = [{heading: "h2", body: "p", classType: "div", className: "service-card"}]
    const [serviceContent1] = [{heading: "IoT Security Assessment", body: "Scan and analyze your IoT devices to detect vulnerabilities and weak points in security."}]
    const [serviceContent2] = [{heading: "Network Risk Analysis", body: "Evaluate how IoT devices interact with your network and identify potential entry points for attacks."}]
    const [serviceContent3] = [{heading: "Security Patch Recommendations", body: "Get recommendations on software updates and security patches to keep your IoT devices safe."}]
    const [serviceContent4] = [{heading: "Authentication & Encryption", body: "Ensure your IoT devices use strong authentication methods and encrypted connections to protect data."}]
    
    return (
        <div className="sectionServices">
            <h1>Our Services</h1>
            <p>We specialize in identifying and assessing security vulnerabilities in IoT devices, helping users secure their smart technology.</p>
            <div className="services-grid">
                <CreateSection sections={serviceContent1} classesName={serviceClassName} />
                <CreateSection sections={serviceContent2} classesName={serviceClassName} />
                <CreateSection sections={serviceContent3} classesName={serviceClassName} />
                <CreateSection sections={serviceContent4} classesName={serviceClassName} />
            </div>
            <div className="cta-section">
                    <p>Want to secure your IoT devices? Get started with our security assessment today!</p>
                    <Link to="/contact" className="cta-button">Contact Us</Link>
            </div>
        </div>
    )
}

export default ServicesSetup;
