import z from 'zod';

const schema = z.uuid();

export class Id<T extends string> {
  private constructor(
    private readonly value: string,
    private readonly type: T
  ) {}

  static create<T extends string>(value: string, type: T): Id<T> {
    if (!schema.safeParse(value).success) {
      throw new Error(`${type} has invalid uuid`);
    }

    return new Id<T>(value, type);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Id<T>): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
