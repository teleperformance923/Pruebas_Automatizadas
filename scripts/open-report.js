import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const path = 'reports/index.html';

if (!existsSync(path)) {
  console.error('No se encontró el reporte:', path);
  process.exit(0);
}

const isWin = process.platform === 'win32';
const isMac = process.platform === 'darwin';

if (isWin) {
  spawn('cmd', ['/c', 'start', '', path], { stdio: 'ignore', shell: true });
} else if (isMac) {
  spawn('open', [path], { stdio: 'ignore' });
} else {
  spawn('xdg-open', [path], { stdio: 'ignore' });
}

console.log('📖 Abriendo reporte:', path);
