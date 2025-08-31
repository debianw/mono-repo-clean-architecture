import type { AIResponseId } from '@/modules/chat/domain/value-objects';

export type AIProviderResponseDto = {
  id: AIResponseId;
  message: string;
};

export enum ModelOption {
  FAST = 'fast',
  BALANCED = 'balanced',
  PREMIUM = 'premium',
}

export enum CreativityOption {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
export enum ToneOption {
  PROFESSIONAL = 'professional',
  CASUAL = 'casual',
  CREATIVE = 'creative',
}

export type GenerateResponseInputDto = {
  prompt: string;
  previousResponseId?: AIResponseId | null;
  options: {
    model: ModelOption;
    creativity?: CreativityOption;
    tone?: ToneOption;
  };
};

export interface AIProvider {
  generateResponse(
    inputDto: GenerateResponseInputDto
  ): Promise<AIProviderResponseDto>;
}
