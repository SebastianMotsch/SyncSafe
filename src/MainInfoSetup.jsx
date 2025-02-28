import CreateSection from "./CreateSection"
import CreateList from "./CreateList"
import { useState } from "react"

const MainInfoSetup = () => {
    const [introductionClassName] = [{heading: "h1", body: "p", classType: "div", className: "section"}]
    const [introductionContent] = [{ heading: "Welcome to SyncSafe", body: "SyncSafe is your go-to application for staying informed and protected while using public Wi-Fi and IoT devices. With the rise of cyber threats, understanding security protocols and vulnerabilities is crucial in safeguarding your personal information. Our app provides insights, best practices, and a comprehensive glossary to enhance your security awareness."}]
    
    const [glossaryClassName] = [{heading: "h2", body: "p", classType: "div", className: "sub-section"}]
    const [glossaryContent1] = [{heading: "What is IoT", body: "IoT (Internet of Things) refers to the network of interconnected devices that communicate and exchange data over the internet. These devices can range from smart home appliances to industrial sensors."}]
    const [glossaryContent2] = [{heading: "Encryption", body: "The process of converting data into a coded format to prevent unauthorized access."}]
    const [glossaryContent3] = [{heading: "Firewall", body: "A network security system that monitors and controls incoming and outgoing traffic based on predetermined security rules."}]
    const [glossaryContent4] = [{heading: "VPN (Virtual Private Network)", body: "A secure connection that encrypts internet traffic, ensuring privacy and protection from cyber threats."}]
    const [glossaryContent5] = [{heading: "Two-Factor Authentication", body: "An additional layer of security requiring a second form of verification beyond a password."}]
    const [glossaryContent6] = [{heading: "MITM (Man in the Middle Attack)", body: "A type of cyberattack where an attacker intercepts communication between two parties to steal or manipulate data."}]

    const [practicesContent] = useState([{body: "Keep your devices updated with the latest security patches.", id: "1"},
                                {body: "Use strong, unique passwords for each IoT device and account.", id: "2"},
                                {body: "Disable unnecessary features and services to minimize risks.", id: "3"},
                                {body: "Regularly monitor network activity for unusual behavior.", id: "4"},
                                {body: "Use encryption and secure communication channels to protect data.", id: "5"}]);

    return (
        <>
        <CreateSection sections={introductionContent} classesName={introductionClassName} />
        
        <div className="section">
            <h1>Glossary of IoT Security Terms</h1>
            <CreateSection sections={glossaryContent1} classesName={glossaryClassName} />
            <CreateSection sections={glossaryContent2} classesName={glossaryClassName} />
            <CreateSection sections={glossaryContent3} classesName={glossaryClassName} />
            <CreateSection sections={glossaryContent4} classesName={glossaryClassName} />
            <CreateSection sections={glossaryContent5} classesName={glossaryClassName} />
            <CreateSection sections={glossaryContent6} classesName={glossaryClassName} />
        </div>

        <div className="section">
            <h1>Best Practices for IoT Security</h1>
            <ul>
                <CreateList sections={practicesContent}/>
            </ul>
        </div>
        
        </>
    )
}

export default MainInfoSetup;