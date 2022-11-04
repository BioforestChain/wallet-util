// @ts-check
import path from 'node:path';
import http from 'node:http';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE = path.resolve(__dirname, '../');
const ROOT = path.resolve(WORKSPACE, 'example');
const LIB = path.resolve(ROOT, 'lib');
if (fs.existsSync(LIB)) {
  fs.unlinkSync(LIB);
}
fs.symlinkSync(path.resolve(WORKSPACE, 'build/web'), LIB, 'dir');

const server = http
  .createServer((req, res) => {
    const fileurl = req.url ?? '/';
    const filepath = path.join(ROOT, fileurl);
    console.error('fetching filepath:', ROOT, filepath);
    if (fs.existsSync(filepath) === false) {
      res.statusCode = 404;
      return res.end(`no found file: ${fileurl}`);
    }
    fs.createReadStream(filepath).pipe(res);
    res.statusCode = 200;
    const ext = path.extname(fileurl);
    const MIME = {
      '.html': 'text/html',
      '.mjs': 'text/javascript',
      '.wasm': 'application/wasm',
    };
    res.setHeader('Content-Type', MIME[ext] ?? 'text/plain');
  })
  .listen(26800, () => {
    console.log('server start at: http://localhost:26800/index.html');
  });
