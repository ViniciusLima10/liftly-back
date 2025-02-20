import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";


const AppRoutes = () => {
    return (
     < Router >
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        
           
        </Routes>
     </Router>
    )
}

export default AppRoutes;