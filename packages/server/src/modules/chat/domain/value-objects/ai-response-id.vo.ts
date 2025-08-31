import z from 'zod';

const schema = z.string().trim().min(1, 'Response ID cannot be empty');

export class AIResponseId {
  private constructor(private readonly value: string) {}

  static create(value: string) {
    const validationResult = schema.safeParse(value);

    if (!validationResult.success) {
      throw new Error(z.prettifyError(validationResult.error));
    }

    return new AIResponseId(validationResult.data);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AIResponseId): boolean {
    return this.value === other.value;
  }

  toString() {
    return this.value;
  }
}
