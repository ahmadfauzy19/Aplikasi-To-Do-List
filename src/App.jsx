import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Notes from './pages/Notes';
// import Developer from './pages/Developer/Developer';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CheckableTag from 'antd/es/tag/CheckableTag';
import ChecklistBoard from './pages/ChecklistBoard/CheckListBoard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/checklistboard" element={<ChecklistBoard />} />
          {/* <Route path="/developer" element={<Developer />} /> */}
        </Routes>
      </Router>
      
    </>
  )
}

export default App
