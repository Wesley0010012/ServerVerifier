export interface StandardAction<I, O> {
  process(input: I): Promise<O>
}
