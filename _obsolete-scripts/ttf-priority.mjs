import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('D:\\projects\\chatnest\\claudian-chat.html', 'utf-8');

// Swap: TTF first (primary), WOFF2 second (fallback)
// Current: src:url("...woff2")format("woff2"),url("...ttf")format("truetype")
// Target:  src:url("...ttf")format("truetype"),url("...woff2")format("woff2")

c = c.replace(
  'src:url("/fonts/AnthropicSans-Roman.woff2")format("woff2"),url("/fonts/AnthropicSans-Roman.ttf")format("truetype")',
  'src:url("/fonts/AnthropicSans-Roman.ttf")format("truetype"),url("/fonts/AnthropicSans-Roman.woff2")format("woff2")'
);
c = c.replace(
  'src:url("/fonts/AnthropicSans-Italic.woff2")format("woff2"),url("/fonts/AnthropicSans-Italic.ttf")format("truetype")',
  'src:url("/fonts/AnthropicSans-Italic.ttf")format("truetype"),url("/fonts/AnthropicSans-Italic.woff2")format("woff2")'
);
c = c.replace(
  'src:url("/fonts/AnthropicSerif-Roman.woff2")format("woff2"),url("/fonts/AnthropicSerif-Roman.ttf")format("truetype")',
  'src:url("/fonts/AnthropicSerif-Roman.ttf")format("truetype"),url("/fonts/AnthropicSerif-Roman.woff2")format("woff2")'
);

writeFileSync('D:\\projects\\chatnest\\claudian-chat.html', c, 'utf-8');
console.log('TTF is now primary font format');
