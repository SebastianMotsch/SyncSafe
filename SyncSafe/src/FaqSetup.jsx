import { useState } from "react";
import CreateSection from "./CreateSection"

const FaqSetup = () => {
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
        <CreateSection sections={faq} />
    )
}

export default FaqSetup;