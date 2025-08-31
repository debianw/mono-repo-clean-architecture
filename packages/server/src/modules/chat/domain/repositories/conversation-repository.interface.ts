import type {
  AIResponseId,
  ConversationId,
} from '@/modules/chat/domain/value-objects';

export interface ConversationRepository {
  save(conversationId: ConversationId, responseId: AIResponseId): Promise<void>;
  getLatestResponseId(
    conversationId: ConversationId
  ): Promise<AIResponseId | null>;
}
