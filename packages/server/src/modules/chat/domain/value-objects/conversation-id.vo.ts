import { Id } from './id.vo';

export type ConversationId = Id<'Conversation'>;

export const ConversationId = {
  create: (value: string) => Id.create(value, 'Conversation' as const),
};
