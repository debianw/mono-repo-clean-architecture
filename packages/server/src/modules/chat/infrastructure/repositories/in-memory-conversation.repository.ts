import type { ConversationRepository } from '@/modules/chat/domain/repositories/conversation-repository.interface';
import {
  AIResponseId,
  ConversationId,
} from '@/modules/chat/domain/value-objects';

const conversations = new Map<string, string>();

export class InMemoryConversationRepository implements ConversationRepository {
  async save(
    conversationId: ConversationId,
    responseId: AIResponseId
  ): Promise<void> {
    conversations.set(conversationId.toString(), responseId.toString());
  }

  async getLatestResponseId(
    conversationId: ConversationId
  ): Promise<AIResponseId | null> {
    const responseId = conversations.get(conversationId.toString());

    return responseId ? AIResponseId.create(responseId) : null;
  }
}
