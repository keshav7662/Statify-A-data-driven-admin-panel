import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import healthRoutes from './routes/healthRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import stockRoutes from './routes/stockRoutes.js'
import visitorRoutes from './routes/visitorRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'
import revenueRoutes from './routes/revenueRoutes.js'
import growthRoutes from './routes/growthRoutes.js'
import chartRoutes from './routes/chartRoutes.js'
import weatherRoutes from './routes/weatherRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json());
//Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes)
app.use('/api/stock', stockRoutes)
app.use('/api/visitor', visitorRoutes)
app.use('/api/subscription', subscriptionRoutes)
app.use('/api/revenue', revenueRoutes)
app.use('/api/growth', growthRoutes)
app.use('/api/charts', chartRoutes);
app.use('/api/weather', weatherRoutes)
// Global error handler
app.use(errorHandler);

export default app; 
