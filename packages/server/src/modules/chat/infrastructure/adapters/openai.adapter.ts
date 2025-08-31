import {
  CreativityOption,
  ModelOption,
  type AIProvider,
  type AIProviderResponseDto,
  type GenerateResponseInputDto,
} from '@/modules/chat/domain/repositories/ai-provider.interface';
import type OpenAI from 'openai';
import { AIResponseId } from '../../domain/value-objects';

const MODELS = {
  [ModelOption.FAST]: 'gpt-4o-mini',
  [ModelOption.BALANCED]: 'gpt-5-mini',
  [ModelOption.PREMIUM]: 'gpt-5',
};

const TEMPERATURES = {
  [CreativityOption.LOW]: 0.2,
  [CreativityOption.MEDIUM]: 0.5,
  [CreativityOption.HIGH]: 0.9,
};

export class OpenAIAdapter implements AIProvider {
  constructor(private readonly client: OpenAI) {}

  async generateResponse(
    inputDto: GenerateResponseInputDto
  ): Promise<AIProviderResponseDto> {
    const response = await this.client.responses.create({
      model: MODELS[inputDto.options.model],
      input: inputDto.prompt,
      temperature: inputDto.options?.creativity
        ? TEMPERATURES[inputDto.options?.creativity]
        : 0.2,
      max_output_tokens: 100,
      previous_response_id: inputDto.previousResponseId?.toString(),
    });

    console.log('response: ', response);
    return {
      id: AIResponseId.create(response.id),
      message: response.output_text,
    };
  }
}
