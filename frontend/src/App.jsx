import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GuideView from './pages/GuideView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/guide/:id" element={<GuideView />} />
      </Routes>
    </Router>
  );
}

export default App;