import express, { type Request, type Response } from 'express';
import Config from '@/config';
import { chatController } from '@/modules/chat';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('ok...');
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    running: 'ok',
  });
});

app.use('/api', chatController);

app.listen(Config.port, () => {
  console.log(`Service listening on port ${Config.port}`);
});
