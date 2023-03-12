import express from 'express';
import routes from './routes/routes';

const app = express();
app.use(express.json());

const PORT = 3009;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/routes', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});