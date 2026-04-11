import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Characters from "../pages/Characters.jsx";
import Login from "../pages/login/login.jsx";
import Register from "../pages/login/registar.jsx";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/characters" element={<Characters/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registrar" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}