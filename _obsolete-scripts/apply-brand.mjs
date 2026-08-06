import { readFileSync, writeFileSync } from 'fs';

const htmlPath = 'D:\\projects\\chatnest\\claudian-chat.html';
const brandPath = '/tmp/brand-assets/agent-chat-brand-assets-private/brand-snippets.html';

let html = readFileSync(htmlPath, 'utf-8');
const brand = readFileSync(brandPath, 'utf-8');

// Extract real SVG symbols
const markMatch = brand.match(/<symbol id="claude-mark"[\s\S]*?<\/symbol>/);
const spinnerMatch = brand.match(/<symbol id="claude-spinner-mark"[\s\S]*?<\/symbol>/);

let replaced = 0;
if (markMatch) {
  html = html.replace(/<symbol id="claude-mark"[\s\S]*?<\/symbol>/, markMatch[0]);
  replaced++;
  console.log('✓ claude-mark');
}
if (spinnerMatch) {
  html = html.replace(/<symbol id="claude-spinner-mark"[\s\S]*?<\/symbol>/, spinnerMatch[0]);
  replaced++;
  console.log('✓ claude-spinner-mark');
}

// Replace CLAUDE_LOGO_SPRITES
const spriteMatch = brand.match(/CLAUDE_LOGO_SPRITES\s*=\s*\{[\s\S]*?\};/);
if (spriteMatch) {
  html = html.replace(/CLAUDE_LOGO_SPRITES\s*=\s*\{[\s\S]*?\};/, spriteMatch[0]);
  replaced++;
  console.log('✓ CLAUDE_LOGO_SPRITES');
}

// UI text replacements
html = html.replace(/(?<=<h1 class="gate-title">)私人会话(?=<\/h1>)/, 'Claudian');
html = html.replace('AI 聊天', 'Claudian');
html = html.replace('Reply to assistant', '回复 Claudian');
html = html.replace('Chat with assistant', '和 Claudian 聊天');
html = html.replace('Assistant:', 'Claudian:');

writeFileSync(htmlPath, html, 'utf-8');
console.log(`Done. ${replaced} asset replacements.`);
