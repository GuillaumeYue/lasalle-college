import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler} from './middleware/errorMiddleware.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';



dotenv.config();
connectDB();

const app = express();
app.use(express.json())

app.get('/' , (req, res) => {
    res.send('API is running')
})
app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders' , orderRoutes)
app.use('/api/upload' , uploadRoutes)

//upload文件夹作为静态文件
const __dirname = path.resolve();//将多个路径解析成一个绝对路径
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT} in mode of ${process.env.NODE_ENV}`.yellow.bold));