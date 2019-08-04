export interface PooledTask {
  readonly url: string;
}

const parseTask = (input: string) => {
  try {
    const url = new URL(input);
  } catch {}
};
