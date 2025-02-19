import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomePageAdm from "./pages/HomePageAdm";
import Home from "./pages/PageInicial";
import LoginAluno from "./pages/LoginAluno";
import LoginAdm from "./pages/LoginAdm";
import LoginPersonal from "./pages/LoginPersonal";




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/MenuAluno" element={<HomePage/>} />
                <Route path="/HomePageAdm" element={<HomePageAdm/>} />
                <Route path="/loginAluno" element={<LoginAluno />} />
                <Route path="/loginAdm" element={<LoginAdm />} />
                <Route path="/loginPersonal" element={<LoginPersonal />} />
                
        
              

            </Routes>
        </Router>
    );
}

export default App;
