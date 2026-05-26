// These are small common functions that can be used across the application
// For example, copyToClipboard function 



// Function to copy text to clipboard -
/**
 * Copies text to clipboard
 * @param text Text to copy
 * @returns
 * Used in Code component to copy paste the code
 */
export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}
// Hightght the Searck Key word in the Search Result Description or Title
export function highlightKeyword(keyword: string, text: string) {
    console.log(keyword, text);
  if (!text || !keyword) return text ?? "";   // ← guard

  const regex = new RegExp(keyword, "gi");
  const highlighted = text.replace(
    regex,
    match => `<strong class="text-pink-600">${match}</strong>`
  );
  return highlighted;
}
