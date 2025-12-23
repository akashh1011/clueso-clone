import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import guideRoutes from './routes/guideRoutes.js';
import userRoutes from './routes/userRoutes.js'; // <-- NEW

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/guides', guideRoutes);
app.use('/api/users', userRoutes); // <-- NEW

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));