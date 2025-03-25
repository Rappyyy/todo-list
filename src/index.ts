import express, { Application, Request, Response, NextFunction} from 'express';
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

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;
    let errorMessage = err.message || 'Internal server error';
  
    // If the error message is a JSON string (for validation errors), parse it
    try {
      errorMessage = JSON.parse(errorMessage);
    } catch {
      // If it’s not a JSON string, leave it as-is
    }
  
    res.status(statusCode).json({
      status: 'failed',
      message: statusCode === 409 ? 'Validation error' : 'Internal server error',
      errors: Array.isArray(errorMessage) ? errorMessage : [{ message: errorMessage }],
    });
  });

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});
