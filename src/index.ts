import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/adminRoute/index'
import connectDB from './utils/db';
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoute';

const app = express();
const port = 3000;
connectDB()

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

// Routes api
app.use('/api/admin', adminRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api', authRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});