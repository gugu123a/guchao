import { readFileSync, writeFileSync } from 'fs';

const src = 'D:\\projects\\chatnest\\frontend-demo\\index.html';
const dst = 'D:\\projects\\chatnest\\claudian-chat.html';

let c = readFileSync(src, 'utf-8');

// 1. Title & meta
c = c.replace('<title>AI 聊天</title>', '<title>Claudian</title>');
c = c.replace('content="#F8F8F6" media=', 'content="#FAF9F5" media=');

// 2. Fonts
c = c.replace('<style></style>\n<style>',
  '<style>@font-face{font-family:"Anthropic Sans";src:url("/fonts/AnthropicSans-Roman.ttf")format("truetype");font-weight:400}@font-face{font-family:"Anthropic Sans";src:url("/fonts/AnthropicSans-Italic.ttf")format("truetype");font-weight:400;font-style:italic}@font-face{font-family:"Anthropic Serif";src:url("/fonts/AnthropicSerif-Roman.ttf")format("truetype");font-weight:300}</style>\n<style>');

// 3. Color tokens
c = c.replace(
  '--bg-primary:#F8F8F6;--bg-surface:#F6F6F4;--bubble-user:#EEEEEC;--bg-sunken:#E6E6E4;--text-primary:#1F1E1D;--text-secondary:#6E6D66;--text-faint:#A6A39A;--accent:#DA7756;--accent-hover:#C96846;--accent-fg:#FFF;--border:rgba(31,30,29,.10);--border-strong:rgba(31,30,29,.18);--font-serif:ui-serif,Georgia,\'PingFang SC\',sans-serif;--font-sans:-apple-system,system-ui,\'PingFang SC\',sans-serif;',
  '--bg-primary:#FAF9F5;--bg-surface:#F5F3EE;--bubble-user:#ECEAE4;--bg-sunken:#E6E3DB;--text-primary:#141413;--text-secondary:#6C6A64;--text-faint:#A09D96;--accent:#CC785C;--accent-hover:#A9583E;--accent-fg:#FFF;--border:rgba(20,20,19,.10);--border-strong:rgba(20,20,19,.18);--font-serif:"Anthropic Serif",ui-serif,Georgia,serif;--font-sans:"Anthropic Sans",-apple-system,system-ui,sans-serif;'
);

// 4. Claude surfaces
c = c.replace(
  '--claude-main-surface:#F9F9F7;--claude-main-surface-soft:#F8F8F4;--claude-text-primary:#171717;--claude-text-secondary:#777670;--claude-text-muted:#A6A49D;--claude-selected-bg:#E9E8E2;--claude-selected-bg-dim:#D0CFCB;--claude-border-soft:#E1E0DA;',
  '--claude-main-surface:#FAF9F5;--claude-main-surface-soft:#F5F3EE;--claude-text-primary:#141413;--claude-text-secondary:#6C6A64;--claude-text-muted:#A09D96;--claude-selected-bg:#EBE5D8;--claude-selected-bg-dim:#D0CFCB;--claude-border-soft:#E0DBCF;'
);
c = c.replace('--claude-new-chat-bg:#252429;--claude-new-chat-text:#FFFFFF;', '--claude-new-chat-bg:#CC785C;--claude-new-chat-text:#FFFFFF;');

// 5. SVG marks
c = c.replace(
  '<symbol id="claude-mark" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="currentColor"/><circle cx="8" cy="8" r="2.4" fill="var(--bg-primary,#fff)"/></symbol>',
  '<symbol id="claude-mark" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="var(--accent,#CC785C)"/><path d="M9.5 8.5l5 3.5-5 3.5V8.5z" fill="var(--accent-fg,#FFF)"/></symbol>'
);
c = c.replace(
  '<symbol id="claude-spinner-mark" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6V2z" fill="currentColor"/></symbol>',
  '<symbol id="claude-spinner-mark" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6V2z" fill="var(--accent,#CC785C)"/></symbol>'
);

// 6. DISABLE demo mode (this is the fix!)
c = c.replace('AGENT_APP_DEMO=true', 'AGENT_APP_DEMO=false');

writeFileSync(dst, c, 'utf-8');
console.log('Done! ' + c.length + ' bytes');
