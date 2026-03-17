export function CalculateReadingTime(text: string): number {
  if (!text) return 0;
  const wordsPerMinute = 200; // Average reading speed
  // Count words (split by whitespace and filter out empty strings)
  const wordsCount = text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordsCount / wordsPerMinute);
  return Math.max(1, readingTime); // Ensure at least 1 minute
};
