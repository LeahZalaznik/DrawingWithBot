export function cleanJsonFromLLM(text: string): string {
  return text
    .replace(/^```json\n?/i, '')
    .replace(/```$/, '')
    .trim();
}
