import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routeHandler from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', routeHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
