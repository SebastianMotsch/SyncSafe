import Header from "./Header"
import Footer from "./Footer"
import UrlSidebar from "./UrlSidebar"
import CreateSection from "./CreateSection"
import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    const [test] = useState([
        { heading: "Test 1", body: "Testing para", id: "1"},
        { heading: "Test 2", body: "Testing para", id: "2"},
        { heading: "Test 3", body: "Testing para", id: "3"},
    ]);
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
    const [faq] = useState([
        { heading: <h1>FAQ #1</h1>, body: <><button className="question">What is SyncSafe?</button>
        <div className="answer">
                <p>SyncSafe is an IoT Vulnerability Scanner designed to help users identify and mitigate security risks in their IoT devices.</p>
        </div></>, id: "1"},
        { heading: <h1>FAQ #2</h1>, body: <><button className="question">How does SyncSafe work?</button>
        <div className="answer">
                <p>SyncSafe scans IoT devices connected to your network for potential vulnerabilities and provides recommendations to enhance security.</p>
        </div></>, id: "2"},
        { heading: <h1>FAQ #3</h1>, body: <><button className="question">Is SyncSafe compatible with all IoT devices?</button>
        <div className="answer">
                <p>SyncSafe is compatible with most modern IoT devices. For older models, some features may have limited functionality.</p>
        </div></>, id: "3"},
        { heading: <h1>FAQ #4</h1>, body: <><button className="question">What data does SyncSafe collect?</button>
        <div className="answer">
                <p>SyncSafe collects device names, connection statuses, and vulnerability scores to provide comprehensive security analysis. All data is stored securely.</p>
        </div></>, id: "4"},
        { heading: <h1>FAQ #5</h1>, body: <><button className="question">How do I disconnect a device from SyncSafe?</button>
        <div className="answer">
                <p>You can disconnect a device by using the 'Disconnect' button on the device's dashboard. The device will appear as disconnected on your screen.</p>
        </div></>, id: "5"},
        { heading: <h1>FAQ #6</h1>, body: <><button className="question">Is SyncSafe compatible with all IoT devices?</button>
        <div className="answer">
                <p>SyncSafe is compatible with most modern IoT devices. For older models, some features may have limited functionality.</p>
        </div></>, id: "6"}
    ]);

  return (
    <Router>

    <Header />

    <div className="container">
        <UrlSidebar />
        <Routes>
            <Route path="/" element={
                <main>
                <CreateSection sections={test} />
                </main>
            }/>
            <Route path="/maininfo" element={
                <main>
                <CreateSection sections={mainInfo} />
                </main>
            }/>
            <Route path="/faq" element={
                <main>
                <CreateSection sections={faq} />
                <script src="./src/faq.js"></script>
                </main>
            }/>
            <Route path="/scanner" element={
                <main>
                <CreateSection sections={test} />
                </main>
            }/>
        </Routes>
    </div>
    
    <Footer />

    </Router>
  )
}

export default App;
