import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './screens/Login'
import Admin from './screens/Admin'
import User from './screens/User'
import Register from "./screens/Register";
import Checkout from "./screens/Checkout";
import UserHistory from "./screens/UserHistory";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/userHistory" element= {<UserHistory />} /> 
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  )
}

export default App
