import { readFileSync, writeFileSync, copyFileSync } from 'fs';

const file = 'D:\\projects\\chatnest\\claudian-chat.html';
let c = readFileSync(file, 'utf-8');

// Remove the mock fetch interceptor + demo data block
// Find the start: after "const demoMessages=["
// Find the end: before "if(state.token)showChat();"

// Remove from "function demoJson" to the closing "}"
const mockStart = c.indexOf('function demoJson(data,status=200)');
const mockEnd = c.indexOf('\nif(state.token)showChat();', mockStart);

if (mockStart >= 0 && mockEnd >= 0) {
  // Also remove "state.token='demo-token';localStorage.setItem('chat_token','demo-token');\n"
  const beforeMock = c.lastIndexOf('\n', mockStart - 2);
  const afterMock = mockEnd + 1; // include newline after if(state.token)...

  c = c.slice(0, beforeMock + 1) + c.slice(afterMock);
  writeFileSync(file, c, 'utf-8');
  console.log('Mock interceptor removed successfully');
} else {
  console.log('Could not find mock interceptor. Start:', mockStart, 'End:', mockEnd);
  // Debug: show context around the area
  const areaStart = c.indexOf('function demoJson');
  console.log('Area around demoJson:', c.slice(Math.max(0, areaStart - 50), areaStart + 100));
}
