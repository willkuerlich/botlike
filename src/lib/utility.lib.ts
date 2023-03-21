export function sleep(timeInMillies: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeInMillies));
}
