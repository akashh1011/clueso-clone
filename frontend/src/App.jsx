import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GuideView from './pages/GuideView';
import Login from './pages/Login';
import Register from './pages/Register'; // Import kiya

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* New Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guide/:id" element={<GuideView />} />
      </Routes>
    </Router>
  );
}

export default App;