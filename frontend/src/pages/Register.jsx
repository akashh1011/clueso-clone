import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Real Backend Call
      const res = await axios.post('http://127.0.0.1:8000/api/users', formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Create Account</h1>
        
        {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input name="name" type="text" required className="w-full p-2 border rounded" onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input name="email" type="email" required className="w-full p-2 border rounded" onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input name="password" type="password" required className="w-full p-2 border rounded" onChange={handleChange} />
          </div>
          <button type="submit" className="w-full p-3 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/" className="font-bold text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;