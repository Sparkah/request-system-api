import express from 'express';
import { AppDataSource } from './db/db';
import requestRoutes from './routes/routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', requestRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('DB connected');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
