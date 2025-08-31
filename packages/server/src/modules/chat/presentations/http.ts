import z from 'zod';
import { Router } from 'express';
import { type Request, type Response } from 'express';
import type { SendMessage } from '@/modules/chat/application/use-cases/send-message.usecase';

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt is required.')
    .max(1000, 'Prompt is too long.'),
  conversationId: z.uuid(),
  options: z.object({
    model: z.enum(['fast', 'balanced', 'premium']),
    creativity: z.enum(['low', 'medium', 'high']),
    tone: z.enum(['professional', 'casual', 'creative']),
  }),
});

export default ({ sendMessage }: { sendMessage: SendMessage }) => {
  const app = Router();

  app.post('/chat', async (req: Request, res: Response) => {
    const parsedResult = chatSchema.safeParse(req.body);

    if (!parsedResult.success) {
      res.status(400).json(z.treeifyError(parsedResult.error));
      return;
    }

    try {
      const { prompt, conversationId, options = {} } = req.body;
      const response = await sendMessage.execute({
        conversationId,
        prompt,
        options: {
          model: options.model,
          creativity: options.creativity,
          tone: options.tone,
        },
      });

      res.json(response);
    } catch (err) {
      const message = (err as Error).message;
      res
        .status(500)
        .json({ error: `Failed to generate a response: ${message}` });
    }
  });

  return app;
};
