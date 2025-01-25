import Header from "./Header"
import Footer from "./Footer"
import UrlSidebar from "./UrlSidebar"
import ContainerSetup from "./ContainerSetup"
import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    const [sections, setSections] = useState([
        { heading: "Test 1", body: "Testing para", page: "info", id: "1"},
        { heading: "Test 2", body: "Testing para", page: "info", id: "2"},
        { heading: "Test 3", body: "Testing para", page: "info", id: "3"},
    ]);

  return (
    <Router>

    <Header />

    <div className="container">
        <UrlSidebar />
        <Routes>
            <Route path="/" element={
                <ContainerSetup sections={sections} />
            }/>
            <Route path="/maininfo" element={
                <ContainerSetup sections={sections} />
            }/>
            <Route path="/faq" element={
                <ContainerSetup sections={sections} />
            }/>
            <Route path="/scanner" element={
                <ContainerSetup sections={sections} />
            }/>
        </Routes>
    </div>
    
    <Footer />

    </Router>
  )
}

export default App;
