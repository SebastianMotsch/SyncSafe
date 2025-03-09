import "./Header.css";

import { useState , useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [selectedScan, setSelectedScan] = useState("UAV Scan");

    const handleScanChange = (event) => {
        setSelectedScan(event.target.value);
        console.log(`Starting scan: ${event.target.value}`);
    };

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const tick = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(tick);
        }
    })

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/"><img src="src/images/syncsafe_logo.png" alt="SyncSafe Logo" className="logo" /></Link>
            </div>
            
            <div className="header-right">
                <div className="time">{time}</div>
                <select className="scan-dropdown" value={selectedScan} onChange={handleScanChange}>
                    <option value="">Get Started</option>
                    <option value="Network Scan">Network Scan</option>
                    <option value="Device Risk Assessment">Device Risk Assessment</option>
                </select>
            </div>
        </header>
    );
};

export default Header;


