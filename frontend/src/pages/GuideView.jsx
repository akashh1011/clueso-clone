import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MousePointer2 } from 'lucide-react';

const GuideView = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    // Port 8000 (Tumhara backend port)
    axios.get(`http://127.0.0.1:8000/api/guides/${id}`)
      .then(res => setGuide(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!guide) return <div className="p-20 text-xl font-bold text-center">Loading Guide...</div>;

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-20 px-6 py-4 bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto">
          <Link to="/dashboard" className="flex items-center gap-2 mb-2 font-medium text-slate-500 hover:text-blue-600">
            <ArrowLeft size={18} /> Back to Library
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">{guide.title}</h1>
        </div>
      </div>

      {/* Steps List Container */}
      <div className="max-w-3xl px-6 mx-auto mt-10 space-y-12">
        
        {/* --- LOOP START --- */}
        {guide.steps.map((step, index) => (
          <div key={index} className="relative flex gap-6">
            
            {/* Step Number Line */}
            <div className="flex flex-col items-center">
              <div className="z-10 flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-blue-600 border-4 rounded-full shadow-md border-slate-50">
                {index + 1}
              </div>
              {/* Line Connector */}
              {index !== guide.steps.length - 1 && (
                <div className="w-1 h-full bg-slate-200 absolute top-10 bottom-[-48px]"></div>
              )}
            </div>
            
            {/* Card Content */}
            <div className="flex-1 p-6 transition bg-white border shadow-sm rounded-xl border-slate-200 hover:shadow-md">
              
              {/* AI Badge (Mock Feature) */}
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-purple-700 bg-purple-100 rounded">
                    ✨ AI Insight
                </span>
              </div>

              {/* Step Description */}
              <h3 className="mb-3 text-xl font-bold text-slate-800">
                 {step.description || `Click on "${step.elementText}"`}
              </h3>
              
              {/* Technical Details */}
              <div className="p-3 font-mono text-sm border rounded-md bg-slate-100 border-slate-200 text-slate-600">
                <div className="flex items-center gap-2 mb-1">
                  <MousePointer2 size={14} className="text-purple-500"/>
                  <strong>Interaction:</strong> Left Click
                </div>
                <div className="truncate">
                  <strong>Element:</strong> &lt;{step.elementTag.toLowerCase()} /&gt;
                </div>
                <div className="mt-1 text-xs truncate text-slate-400">
                  {step.url}
                </div>
              </div>

            </div>
          </div>
        ))}
        {/* --- LOOP END --- */}

      </div>
      
      {/* Feedback Section (Loop ke bahar hai, isliye yahan 'step' use nahi kar sakte) */}
      <div className="max-w-xl p-6 mx-auto mt-16 text-center bg-white border shadow-sm rounded-xl border-slate-200">
          <h4 className="mb-4 font-semibold text-gray-700">Was this guide helpful?</h4>
          <div className="flex justify-center gap-4">
              <button onClick={() => alert("Feedback recorded! Thanks.")} className="px-4 py-2 transition border rounded hover:bg-gray-50">
                  👎 No
              </button>
              <button onClick={() => alert("Glad you liked it!")} className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700">
                  👍 Yes, helpful
              </button>
          </div>
      </div>

    </div>
  );
};

export default GuideView;