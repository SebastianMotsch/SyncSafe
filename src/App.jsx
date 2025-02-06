import Header from "./Header"
import Footer from "./Footer"
import UrlSidebar from "./UrlSidebar"

import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MainInfoSetup from "./MainInfoSetup";
import FaqSetup from "./FaqSetup";

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
                <script type="script" src="/src/faq.js"></script>
                </main>
            }/>
            <Route path="/scanner" element={
                <main>
                
                </main>
            }/>
        </Routes>
    </div>
    
    <Footer />
    
    </Router>
  )
}

export default App;
