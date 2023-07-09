export const truncated = (text: string, maxLength: number) =>
  text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text;
