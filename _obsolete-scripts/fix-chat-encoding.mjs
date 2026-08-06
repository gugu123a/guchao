import { readFileSync, writeFileSync } from 'fs';

const src = 'D:\\projects\\chatnest\\claudian-chat.html';
let content = readFileSync(src, 'utf-8');

// Fix encoding: replace the garbled patterns
// The file was corrupted by PowerShell encoding issues.
// Let me rewrite the key strings to ensure proper encoding.

// Fix the gate/login page text
content = content.replace(
  '绉佷汉浼氳瘽',
  '私人对话'
);
content = content.replace(
  '杈撳叆璁块棶瀵嗙爜浠ョ户缁',
  '输入访问密码以继续'
);
content = content.replace(
  '璁块棶瀵嗙爜',
  '访问密码'
);
content = content.replace(
  '杩涘叆',
  '进入'
);
content = content.replace(
  '瀵嗙爜涓',
  '密码不'
);

writeFileSync(src, content, 'utf-8');
console.log('Fixed encoding');
