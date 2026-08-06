import { readFileSync, writeFileSync } from 'fs';

const src = 'D:\\projects\\chatnest\\frontend-demo\\index.html';
const dst = 'D:\\projects\\chatnest\\claudian-chat.html';
const brand = readFileSync('D:\\projects\\chatnest\\brand-snippets.html', 'utf-8');

let c = readFileSync(src, 'utf-8');

// ── Core branding ──
c = c.replace('<title>AI 聊天</title>', '<title>Claudian</title>');
c = c.replace('content="#F8F8F6" media=', 'content="#FAF9F5" media=');

// ── SVGs ──
const mark = brand.match(/<symbol id="claude-mark"[\s\S]*?<\/symbol>/);
if (mark) c = c.replace(/<symbol id="claude-mark"[\s\S]*?<\/symbol>/, mark[0]);
const spin = brand.match(/<symbol id="claude-spinner-mark"[\s\S]*?<\/symbol>/);
if (spin) c = c.replace(/<symbol id="claude-spinner-mark"[\s\S]*?<\/symbol>/, spin[0]);
const sprites = brand.match(/CLAUDE_LOGO_SPRITES\s*=\s*\{[\s\S]*?\};/);
if (sprites) c = c.replace(/CLAUDE_LOGO_SPRITES\s*=\s*\{[\s\S]*?\};/, sprites[0]);

// ── Fonts with crossorigin + woff2 + TTF ──
const FONT_FACE = `
<style>@font-face{font-family:"Anthropic Sans";src:url("/fonts/AnthropicSans-Roman.woff2")format("woff2");font-display:swap}@font-face{font-family:"Anthropic Serif";src:url("/fonts/AnthropicSerif-Roman.woff2")format("woff2");font-display:swap}</style>
<style>`;

c = c.replace('<style></style>\r\n<style>', FONT_FACE);

// ── Auto-login ──
c = c.replace('window.AGENT_APP_DEMO=true', 'window.AGENT_APP_DEMO=false');
c = c.replace('if(state.token)showChat();resetEmpty();',
  'state.token="claudian-auto-token";localStorage.setItem("chat_token","claudian-auto-token");showChat();resetEmpty();');
c = c.replace('id="gate"', 'id="gate" style="display:none"');

// ── Click handler fix ──
c = c.replace(
  'button.onclick=e=>{console.log("[lp]","click","lp=",sessionContext.longPressed,"moved=",moved);if(sessionContext.longPressed||moved){e.preventDefault();e.stopPropagation();sessionContext.longPressed=false;return}openSession(session)}',
  'button.onclick=e=>{moved=false;sessionContext.longPressed=false;openSession(session)}'
);

// ── SW cleanup + manifest ──
c = c.replace('</head>',
  '<meta name="theme-color" content="#CC785C">\n<script>try{navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(r){r.unregister()})})}catch(e){}</script>\n<link rel="manifest" href="/chat/manifest.webmanifest">\n</head>');

// ── Chat visible by default ──
c = c.replace('<main id="chat" class="hidden">', '<main id="chat">');
c = c.replace('<body>', '<body class="chat-ready">');

// ── Text changes ──
c = c.replace('placeholder="回复助手"', 'placeholder="Send messages to Claude..."');
c = c.replace("input.placeholder='和助手聊天'", "input.placeholder='Send messages to Claude...'");
c = c.replace("input.placeholder='回复助手';const el", "input.placeholder='Send messages to Claude...';const el");
c = c.replace("input.placeholder='回复助手';streamInner", "input.placeholder='Send messages to Claude...';streamInner");
c = c.replace('AI 可能会出错。<br>请自行核对重要信息。', 'Claude is AI and can make mistakes.<br>Please double-check responses.');
c = c.replace('<h1 class="mobile-sidebar-title">AI 聊天</h1>', '<h1 class="mobile-sidebar-title">Claude</h1>');

// ── User messages in sans, assistant in serif ──
c = c.replace('.msg-user .bubble{font-family:var(--font-serif);font-size:var(--text-read);max-width:85%;padding:12px 18px;background:var(--bubble-user);border-radius:var(--radius-bubble);white-space:pre-wrap;word-break:break-word}',
  '.msg-user .bubble{font-size:var(--text-read);max-width:85%;padding:12px 18px;background:var(--bubble-user);border-radius:var(--radius-bubble);white-space:pre-wrap;word-break:break-word}');

// ── Update body font to sans, assistant messages to serif ──
c = c.replace('body{font-family:var(--font-sans);', 'body{font-family:"Anthropic Sans",-apple-system,system-ui,sans-serif;');
c = c.replace('.msg-claude .md{font-family:var(--font-serif);font-size:var(--text-read);word-break:break-word}',
  '.msg-claude .md{font-family:"Anthropic Serif",Georgia,serif;font-size:var(--text-read);word-break:break-word}');

// ── Topbar model in sans ──
c = c.replace('.topbar-model-main{display:flex;align-items:center;gap:var(--space-1);font:500 17px var(--font-serif)}',
  '.topbar-model-main{display:flex;align-items:center;gap:var(--space-1);font:500 17px "Anthropic Sans",-apple-system,system-ui,sans-serif}');

// ── Splash endpoint update ──
c = c.replace('",{"line":"前端演示"})', '",{"line":"今天想聊什么？"})');

writeFileSync(dst, c, 'utf-8');
console.log('Done: ' + (c.length / 1024).toFixed(0) + 'KB');
