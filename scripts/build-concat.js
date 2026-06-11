const fs = require('fs');
const path = require('path');

const framesDir = path.resolve(__dirname, '../public/frames');
const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp')).sort();

const map = new Map();
for (const f of files) {
  const n = parseInt(f.match(/(\d+)/)[1]);
  map.set(n, path.join(framesDir, f).split('\\').join('/'));
}

const nums = [...map.keys()].sort((a, b) => a - b);
const min = nums[0];
const max = nums[nums.length - 1];
console.log('Frame range:', min, '-', max, '| available:', nums.length);

const lines = [];
let last = map.get(min);
for (let i = min; i <= max; i++) {
  if (map.has(i)) last = map.get(i);
  lines.push("file '" + last + "'");
  lines.push('duration 0.04167');
}

const concatFile = path.resolve(__dirname, 'frame_concat.txt');
fs.mkdirSync(path.dirname(concatFile), { recursive: true });
fs.writeFileSync(concatFile, lines.join('\n'));
console.log('Concat written:', concatFile, '| virtual frames:', lines.length / 2);
