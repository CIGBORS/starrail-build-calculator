import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Characters from "../pages/Characters"

export default function Router() {

 return (
  <BrowserRouter>
   <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/characters" element={<Characters/>}/>

   </Routes>
  </BrowserRouter>
 )

}