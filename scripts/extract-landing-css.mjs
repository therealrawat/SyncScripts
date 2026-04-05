import fs from 'fs';
const s = fs.readFileSync('syncscript-landing.html', 'utf8');
const m = s.match(/<style>([\s\S]*?)<\/style>/);
if (!m) throw new Error('no style');
fs.writeFileSync('src/landing.css', m[1].replace(/^  /gm, ''));
