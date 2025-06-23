import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/products', productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));