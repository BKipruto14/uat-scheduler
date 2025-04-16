import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FormPage from './pages/FormPage'
import CalendarPage from './pages/CalendarPage'
import { Link } from 'react-router-dom';
import './App.css';
function App() {

  return (
    < Router >
        {/* NavBar */}
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/form" style={{ marginRight: '1rem' }}>Form</Link>
          <Link to="/calendar">Calendar</Link>
        </nav>
      <Routes>
        <Route path="/form" element={<FormPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router >
  )
}

export default App;
