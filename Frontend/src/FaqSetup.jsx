import CreateDropdown from "./CreateDropdown"

const FaqSetup = () => {
    const [question1] = [{ heading: "What is SyncSafe?", body: "SyncSafe is an IoT Vulnerability Scanner designed to help users identify and mitigate security risks in their IoT devices."}]
    const [question2] = [{ heading: "How does SyncSafe work?", body: "SyncSafe scans IoT devices connected to your network for potential vulnerabilities and provides recommendations to enhance security"}]
    const [question3] = [{ heading: "Is SyncSafe compatible with all IoT devices?", body: "SyncSafe is compatible with most modern IoT devices. For older models, some features may have limited functionality."}]
    const [question4] = [{ heading: "What data does SyncSafe collect?", body: "SyncSafe collects device names, connection statuses, and vulnerability scores to provide comprehensive security analysis. All data is stored securely."}]
    const [question5] = [{ heading: "How do I disconnect a device from SyncSafe?", body: "You can disconnect a device by using the 'Disconnect' button on the device's dashboard. The device will appear as disconnected on your screen."}]
    const [question6] = [{ heading: "Is SyncSafe compatible with all IoT devices?", body: "SyncSafe is compatible with most modern IoT devices. For older models, some features may have limited functionality."}]

    return (
        <div className="section">
            <h1>Basic Questions</h1>
            <CreateDropdown sections={question1} />
            <CreateDropdown sections={question2} />
            <CreateDropdown sections={question3} />
            <CreateDropdown sections={question4} />
            <CreateDropdown sections={question5} />
            <CreateDropdown sections={question6} />
        </div>
    )
}

export default FaqSetup;