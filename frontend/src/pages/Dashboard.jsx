import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Calendar, ArrowRight, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  // LocalStorage se User ka data nikalo
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // 1. Security Check: Agar user login nahi hai, toh wapis bhejo
    if (!user) {
      navigate('/');
      return;
    }

    // 2. Data Fetching (Port 8000)
    axios.get('http://127.0.0.1:8000/api/guides')
      .then(res => setGuides(res.data))
      .catch(err => console.error("Error fetching guides:", err));
  }, [navigate, user]); // Dependency array mein user aur navigate daala

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Token delete karo
    navigate('/'); // Login page pe jao
  };

  return (
    <div className="min-h-screen p-10 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section with User Name & Logout */}
        <div className="flex items-center justify-between p-6 mb-8 bg-white border shadow-sm rounded-xl border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Hello, {user ? user.name : 'User'} 👋
            </h1>
            <p className="mt-1 text-slate-500">Here are your recorded guides.</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 font-medium text-red-600 transition border border-transparent rounded-lg hover:bg-red-50 hover:border-red-100"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Guides Grid */}
        {guides.length === 0 ? (
          <div className="py-20 text-center bg-white border border-gray-300 border-dashed rounded-xl">
            <p className="text-lg text-gray-500">No guides found yet.</p>
            <p className="mt-2 text-sm text-gray-400">
              Open a new tab, use the extension to record, and refresh this page!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide._id} to={`/guide/${guide._id}`} className="group">
                <div className="flex flex-col h-full p-6 transition bg-white border shadow-sm cursor-pointer rounded-xl border-slate-200 hover:shadow-md hover:border-blue-300">
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 text-blue-600 transition rounded-lg bg-blue-50 group-hover:bg-blue-600 group-hover:text-white">
                      <Play size={24} />
                    </div>
                  </div>
                  
                  <h3 className="mb-2 text-xl font-bold transition text-slate-800 group-hover:text-blue-600 line-clamp-2">
                    {guide.title}
                  </h3>
                  
                  <div className="flex items-center justify-between pt-4 mt-auto text-sm border-t text-slate-500 border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(guide.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center font-medium text-blue-600">
                      {guide.steps.length} Steps <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;