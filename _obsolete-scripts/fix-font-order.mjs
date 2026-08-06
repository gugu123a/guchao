import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('D:\\projects\\chatnest\\claudian-chat.html', 'utf-8');

// Swap back: WOFF2 primary (smaller, faster), TTF fallback
const swaps = [
  ['AnthropicSans-Roman', 'AnthropicSans-Roman'],
  ['AnthropicSans-Italic', 'AnthropicSans-Italic'],
  ['AnthropicSerif-Roman', 'AnthropicSerif-Roman'],
];

for (const [base] of swaps) {
  // Current: ...ttf)format("truetype"),url("...woff2")format("woff2")
  // Target:  ...woff2)format("woff2"),url("...ttf")format("truetype")
  const old = `src:url("/fonts/${base}.ttf")format("truetype"),url("/fonts/${base}.woff2")format("woff2")`;
  const fresh = `src:url("/fonts/${base}.woff2")format("woff2"),url("/fonts/${base}.ttf")format("truetype")`;
  c = c.replace(old, fresh);
}

writeFileSync('D:\\projects\\chatnest\\claudian-chat.html', c, 'utf-8');
console.log('WOFF2 is primary again');
