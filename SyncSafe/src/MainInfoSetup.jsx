import { useState } from "react";
import CreateSection from "./CreateSection"

const MainInfoSetup = () => {
    const [mainInfo] = useState([
        { heading: <h1> Welcome to SyncSafe </h1>, body: <p>SyncSafe is your go-to application for staying
            informed and protected while using public Wi-Fi and IoT devices. With the rise of cyber threats,
            understanding security protocols and vulnerabilities is crucial in safeguarding your personal information.
            Our app provides insights, best practices, and a comprehensive glossary to enhance your security awareness.</p>, id: "1"},
        { heading: <h1>Glossary of IoT Security Terms</h1>, body: 
        <>
        <div className="sub-section">
            <h2>What is IoT</h2>
            <p>
                IoT (Internet of Things) refers to the network of interconnected devices that communicate and exchange data over the internet. These devices can range from smart home appliances to industrial sensors.
            </p>
        </div>
        <div className="sub-section">
            <h2>Encryption</h2>
            <p>
                The process of converting data into a coded format to prevent unauthorized access.
            </p>
        </div>

        <div className="sub-section">
            <h2>Firewall</h2>
            <p>
                A network security system that monitors and controls incoming and outgoing traffic based on predetermined security rules.
            </p>
        </div>
        <div className="sub-section">
            <h2>VPN (Virtual Private Network)</h2>
            <p>
                A secure connection that encrypts internet traffic, ensuring privacy and protection from cyber threats.
            </p>
        </div>
        <div className="sub-section">
            <h2>Two-Factor Authentication</h2>
            <p>
                An additional layer of security requiring a second form of verification beyond a password.
            </p>
        </div>
        <div className="sub-section">
            <h2>MITM (Man in the Middle Attack)</h2>
            <p>
                A type of cyberattack where an attacker intercepts communication between two parties to steal or manipulate data.
            </p>
        </div>
        </>, id: "2"},
        { heading: <h1>Best Practices for IoT Security</h1>, body: <ul>
            <li>Keep your devices updated with the latest security patches.</li>
            <li>Use strong, unique passwords for each IoT device and account.</li>
            <li>Disable unnecessary features and services to minimize risks.</li>
            <li>Regularly monitor network activity for unusual behavior.</li>
            <li>Use encryption and secure communication channels to protect data.</li>
        </ul>, id: "3"},
    ]);

    return (
        <CreateSection sections={mainInfo} />
    )
}

export default MainInfoSetup;