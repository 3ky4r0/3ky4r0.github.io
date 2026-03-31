/**
 * Custom Markdown Parser for App.jsx
 * Following vercel-react-best-practices (js-early-exit)
 */
export const parseCustomMarkdown = (content) => {
  if (!content) return "";
  return content
    .replace(/==([^=]+)==/g, '<mark>$1</mark>')
    .replace(/%([^%]+)% (.+?) %%/g, '<span style="color: $1">$2</span>')
    .replace(/-> (.+?) <-/g, '<div align="center">$1</div>')
    .replace(/-> (.+?) ->/g, '<div align="right">$1</div>')
    .replace(/!> (.+)/g, '<details class="spoiler"><summary>Spoiler</summary>$1</details>');
};
