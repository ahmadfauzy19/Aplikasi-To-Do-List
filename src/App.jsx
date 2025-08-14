import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ChecklistBoard from './pages/ChecklistBoard/CheckListBoard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/checklistboard" element={<ChecklistBoard />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
