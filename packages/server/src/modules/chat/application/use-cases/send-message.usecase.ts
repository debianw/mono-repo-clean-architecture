import {
  type AIProvider,
  type AIProviderResponseDto,
  type GenerateResponseInputDto,
} from '@/modules/chat/domain/repositories/ai-provider.interface';
import type { ConversationRepository } from '@/modules/chat/domain/repositories/conversation-repository.interface';
import { ConversationId } from '@/modules/chat/domain/value-objects';

export type SendMessageInputDto = {
  conversationId: string;
  prompt: string;
  options: GenerateResponseInputDto['options'];
};

export class SendMessage {
  constructor(
    private readonly aiClient: AIProvider,
    private readonly conversationRepo: ConversationRepository
  ) {}

  async execute(dto: SendMessageInputDto): Promise<AIProviderResponseDto> {
    const conversationId = ConversationId.create(dto.conversationId);
    const previousResponseId =
      await this.conversationRepo.getLatestResponseId(conversationId);

    const response = await this.aiClient.generateResponse({
      prompt: dto.prompt,
      previousResponseId,
      options: dto.options,
    });

    await this.conversationRepo.save(conversationId, response.id);

    return response;
  }
}
