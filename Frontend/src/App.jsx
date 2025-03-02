import Header from "./Header"
import Footer from "./Footer"
import UrlSidebar from "./UrlSidebar"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MainInfoSetup from "./MainInfoSetup";
import FaqSetup from "./FaqSetup";
import ScannerSetup from "./Scanner"

function App() {

  return (
    <Router>

    <Header />

    <div className="container">
        <UrlSidebar />
        <Routes>
            <Route path="/" element={
                <main>
                <MainInfoSetup />
                </main>
            }/>
            <Route path="/maininfo" element={
                <main>
                <MainInfoSetup />
                </main>
            }/>
            <Route path="/faq" element={
                <main>
                <FaqSetup />
                </main>
            }/>
            <Route path="/scanner" element={
                <main>
                <ScannerSetup />
                </main>
            }/>
        </Routes>
    </div>
    
    <Footer />
    
    </Router>
  )
}

export default App;
