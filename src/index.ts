import express, { Application } from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Well done!');
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});
