import { Link } from "react-router-dom";

const Header = () => {
    return (
    <header>
        <div className="logo-container">
            <Link to="/"><img src="src/images/syncsafe_logo.png" alt="SyncSafe Logo" className="logo" /></Link>
        </div>
    </header>
    )
}

export default Header;