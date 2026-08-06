import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('D:\\projects\\chatnest\\claudian-chat.html', 'utf-8');

// Fix: remove ?v=3 that was added after the DOT (without extension)
// Pattern: Roman.?v=3 → Roman.woff2
c = c.replace(/AnthropicSans-Roman\.\?v=3/g, 'AnthropicSans-Roman.woff2');
c = c.replace(/AnthropicSans-Roman\.ttf/g, 'AnthropicSans-Roman.ttf');
c = c.replace(/AnthropicSerif-Roman\.\?v=3/g, 'AnthropicSerif-Roman.woff2');
c = c.replace(/AnthropicSerif-Roman\.ttf/g, 'AnthropicSerif-Roman.ttf');
c = c.replace(/AnthropicSans-Italic\.\?v=3/g, 'AnthropicSans-Italic.woff2');
c = c.replace(/AnthropicSans-Italic\.ttf/g, 'AnthropicSans-Italic.ttf');

// Now add proper ?v=4
c = c.replace(/\.woff2/g, '.woff2?v=4');
c = c.replace(/\.ttf/g, '.ttf?v=4');

// But NOT inside .ttf?v=4 which would become .ttf?v=4?v=4 - fix that
c = c.replace(/\.ttf\?v=4\?v=4/g, '.ttf?v=4');

writeFileSync('D:\\projects\\chatnest\\claudian-chat.html', c, 'utf-8');
console.log('Fixed');

// Verify
const v = readFileSync('D:\\projects\\chatnest\\claudian-chat.html', 'utf-8');
const sans = v.match(/AnthropicSans-Roman\.[a-z0-9?=]+/g);
console.log('URLs:', sans);
