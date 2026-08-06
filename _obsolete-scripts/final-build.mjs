import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('D:\\projects\\chatnest\\claudian-chat.html', 'utf-8');

// 1. Font-face with WOFF2 + Noto Serif
c = c.replace(
  '<style></style>\n<style>',
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600&display=swap" rel="stylesheet">\n<style>@font-face{font-family:"Anthropic Sans";src:url("/fonts/AnthropicSans-Roman.woff2?v=5")format("woff2"),url("/fonts/AnthropicSans-Roman.ttf?v=5")format("truetype");font-weight:400}@font-face{font-family:"Anthropic Sans";src:url("/fonts/AnthropicSans-Italic.woff2?v=5")format("woff2"),url("/fonts/AnthropicSans-Italic.ttf?v=5")format("truetype");font-weight:400;font-style:italic}@font-face{font-family:"Anthropic Serif";src:url("/fonts/AnthropicSerif-Roman.woff2?v=5")format("woff2"),url("/fonts/AnthropicSerif-Roman.ttf?v=5")format("truetype");font-weight:300}</style>\n<style>'
);

// 2. Noto Serif SC in font-serif stack
c = c.replace(
  '--font-serif:"Anthropic Serif",Georgia,serif;',
  '--font-serif:"Anthropic Serif","Noto Serif SC",Georgia,serif;'
);

writeFileSync('D:\\projects\\chatnest\\claudian-chat.html', c, 'utf-8');

// Verify
const v = readFileSync('D:\\projects\\chatnest\\claudian-chat.html', 'utf-8');
console.log('font-face count:', (v.match(/@font-face/g) || []).length);
const urls = v.match(/AnthropicSans-Roman\.[a-z0-9?=]+/g);
console.log('Font URLs:', urls);
