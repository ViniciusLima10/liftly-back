import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomePageAdm from "./pages/HomePageAdm";
import Home from "./pages/PageInicial";
import LoginAluno from "./pages/LoginAluno";
import LoginAdm from "./pages/LoginAdm";
import LoginPersonal from "./pages/LoginPersonal";
import ProfilePage from "./pages/ProfileAluno";
import ProfileAdm from "./pages/ProfileAdm";
import ProfilePersonal from "./pages/ProfilePersonal";




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/MenuAluno" element={<HomePage/>} />
                <Route path="/MenuAdm" element={<HomePageAdm/>} />
                <Route path="/loginAluno" element={<LoginAluno />} />
                <Route path="/loginAdm" element={<LoginAdm />} />
                <Route path="/loginPersonal" element={<LoginPersonal />} />
                <Route path="/perfilAluno" element={<ProfilePage />} />
                <Route path="/perfilAdm" element={<ProfileAdm />} />
                <Route path="/perfilPersonal" element={<ProfilePersonal />} />
                
        
              

            </Routes>
        </Router>
    );
}

export default App;
