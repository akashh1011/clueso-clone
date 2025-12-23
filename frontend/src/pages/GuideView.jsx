import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MousePointer2 } from 'lucide-react';

const GuideView = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
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
          <Link to="/" className="flex items-center gap-2 mb-2 font-medium text-slate-500 hover:text-blue-600">
            <ArrowLeft size={18} /> Back to Library
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">{guide.title}</h1>
        </div>
      </div>

      {/* Steps List */}
      <div className="max-w-3xl px-6 mx-auto mt-10 space-y-12">
        {guide.steps.map((step, index) => (
          <div key={index} className="relative flex gap-6">
            
            {/* Step Number & Line */}
            <div className="flex flex-col items-center">
              <div className="z-10 flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-blue-600 border-4 rounded-full shadow-md border-slate-50">
                {index + 1}
              </div>
              {index !== guide.steps.length - 1 && (
                <div className="w-1 h-full bg-slate-200 absolute top-10 bottom-[-48px]"></div>
              )}
            </div>
            
            {/* Content Card */}
            <div className="flex-1 p-6 transition bg-white border shadow-sm rounded-xl border-slate-200 hover:shadow-md">
              <h3 className="mb-3 text-xl font-bold text-slate-800">
                Click on <span className="text-blue-600">"{step.elementText}"</span>
              </h3>
              
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
      </div>
      
      <div className="mt-16 text-center">
        <div className="inline-block px-6 py-2 font-bold text-green-700 bg-green-100 rounded-full">
          🎉 Guide Completed
        </div>
      </div>
    </div>
  );
};

export default GuideView;