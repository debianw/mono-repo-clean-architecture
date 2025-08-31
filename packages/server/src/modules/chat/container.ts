import config from '@/config';
import OpenAI from 'openai';
import { OpenAIAdapter } from '@/modules/chat/infrastructure/adapters';
import { InMemoryConversationRepository } from '@/modules/chat/infrastructure/repositories';
import { SendMessage } from '@/modules/chat/application/use-cases/send-message.usecase';
import createChatController from '@/modules/chat/presentations/http';

// Infra
const openAiClient = new OpenAI({ apiKey: config.openai.key });
const aiProvider = new OpenAIAdapter(openAiClient);
const conversationRepo = new InMemoryConversationRepository();

// Application
const sendMessageUseCase = new SendMessage(aiProvider, conversationRepo);

// Presentation
const chatController = createChatController({
  sendMessage: sendMessageUseCase,
});

export { chatController };
