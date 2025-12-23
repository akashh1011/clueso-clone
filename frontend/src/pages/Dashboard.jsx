import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Play, Calendar, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    
    axios.get('http://127.0.0.1:8000/api/guides')
      .then(res => setGuides(res.data))
      .catch(err => console.error("Error connecting to backend:", err));
  }, []);

  return (
    <div className="min-h-screen p-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">My Clueso Guides</h1>
      
      {guides.length === 0 ? (
        <div className="py-20 text-center bg-white border border-gray-400 border-dashed rounded-xl">
          <p className="text-xl font-semibold text-gray-600">No guides found yet.</p>
          <p className="mt-2 text-gray-500">Use the Chrome Extension to record your first guide!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide._id} to={`/guide/${guide._id}`} className="group">
              <div className="h-full p-6 transition bg-white border shadow-sm cursor-pointer rounded-xl border-slate-200 hover:shadow-md hover:border-blue-400">
                <div className="p-3 mb-4 text-blue-600 transition rounded-lg bg-blue-50 w-fit group-hover:bg-blue-600 group-hover:text-white">
                  <Play size={24} />
                </div>
                
                <h3 className="mb-2 text-xl font-bold text-slate-800 group-hover:text-blue-600">
                  {guide.title}
                </h3>
                
                <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-500 border-t">
                  <span className="flex items-center gap-1">
                     <Calendar size={14}/> {new Date(guide.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center font-semibold text-blue-600">
                    {guide.steps.length} Steps <ArrowRight size={14} className="ml-1"/>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;