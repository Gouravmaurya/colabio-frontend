#!/usr/bin/env node
// Exact-size PNG capture for the visual gates. Zero dependencies (Node 22+, any installed Chrome or Edge).
// Headless Chrome windows cannot be narrower than about 500 px, so this uses device-metrics emulation instead:
// the recorded width, height and DPR are the real CSS values the page was laid out at.
// Usage: node capture.mjs <url> --out <file.png> [--width 1440] [--height 900] [--dpr 1] [--mobile] [--wait 6000]
//                          [--full-page] [--reduced-motion] [--scroll <y>]
// overflowX is true when the page is wider than the requested width (scroll width, or a layout viewport widened by --mobile).
// Prints one JSON line to paste into a visual-review record: { file, viewport: {width,height,dpr}, extent, scrollWidth, overflowX, ... }
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const argv = process.argv.slice(2);
const url = argv.find((a) => !a.startsWith('--') && /^(https?:|file:)/.test(a));
const flag = (k, d) => { const i = argv.indexOf('--' + k); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };
const has = (k) => argv.includes('--' + k);
if (!url || !flag('out')) { console.error('usage: node capture.mjs <url> --out <file.png> [--width 1440] [--height 900] [--dpr 1] [--mobile] [--wait 6000] [--full-page] [--reduced-motion] [--scroll <y>]'); process.exit(2); }
const W = +flag('width', 1440), H = +flag('height', 900), DPR = +flag('dpr', 1), WAIT = +flag('wait', 6000), out = path.resolve(flag('out'));

const candidates = [process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium'].filter(Boolean);
const exe = candidates.find((p) => fs.existsSync(p));
if (!exe) { console.error('No Chrome or Edge found. Set CHROME_PATH.'); process.exit(3); }

const port = 9300 + Math.floor(Math.random() * 600), profile = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-cap-'));
const chrome = spawn(exe, [`--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--headless=new', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--mute-audio', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const done = async (code) => { try { chrome.kill(); } catch { /* already closed */ } await sleep(300); try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* profile may be locked briefly */ } process.exit(code); };

try {
  let target;
  for (let i = 0; i < 60 && !target; i++) { try { const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); target = list.find((t) => t.type === 'page'); } catch { /* not up yet */ } if (!target) await sleep(250); }
  if (!target) throw new Error('Browser did not start.');
  const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pending = new Map(); const waiters = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const { r, j } = pending.get(d.id); pending.delete(d.id); d.error ? j(new Error(d.error.message)) : r(d.result); } else if (d.method) waiters.filter((w) => w.m === d.method).forEach((w) => w.r(d.params)); };
  const send = (method, params = {}) => new Promise((r, j) => { const n = ++id; pending.set(n, { r, j }); ws.send(JSON.stringify({ id: n, method, params })); });
  const once = (m) => new Promise((r) => waiters.push({ m, r }));
  const evalJs = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: DPR, mobile: has('mobile') });
  if (has('reduced-motion')) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url }); await loaded;
  await evalJs('document.fonts ? document.fonts.ready.then(() => true) : true');
  await sleep(WAIT);
  if (flag('scroll')) { await evalJs(`(window.lenis && window.lenis.destroy && window.lenis.destroy(), window.scrollTo(0, ${+flag('scroll')}), true)`); await sleep(1500); }
  const info = JSON.parse(await evalJs('JSON.stringify({ iw: innerWidth, ih: innerHeight, dpr: devicePixelRatio, sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, y: Math.round(scrollY), fonts: [...document.fonts].filter((f) => f.status === "loaded").length, title: document.title })'));
  const params = { format: 'png' };
  if (has('full-page')) { params.captureBeyondViewport = true; params.clip = { x: 0, y: 0, width: info.iw, height: info.sh, scale: 1 }; }
  const shot = await send('Page.captureScreenshot', params);
  fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, Buffer.from(shot.data, 'base64'));
  const b = fs.readFileSync(out);
  console.log(JSON.stringify({ file: path.basename(out), viewport: { width: info.iw, height: info.ih, dpr: info.dpr }, extent: has('full-page') ? 'full-page' : 'viewport',
    png: { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }, scrollWidth: info.sw, requestedWidth: W, overflowX: info.sw > W + 1 || info.iw > W + 1, scrollY: info.y, fontsLoaded: info.fonts, capturedAt: new Date().toISOString(), route: url }));
  ws.close(); await done(0);
} catch (e) { console.error('capture failed: ' + e.message); await done(1); }
