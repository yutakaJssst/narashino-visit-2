/*
 * ステージの自動チェック。
 *   node tools/check-stages.mjs
 * script.js の siteData.game.stages を読み、次を確かめます。
 *   - すべての行の長さが同じか
 *   - スタート P とゴール G がちょうど1つずつあるか
 *   - P から G まで、ジャンプで本当にたどり着けるか
 *   - 取れないアイテムが残っていないか（警告）
 * ステージを書き換えたら必ず実行してください。
 */

import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../script.js", import.meta.url), "utf8");
const start = source.indexOf("const siteData = {");
const end = source.indexOf("\n};", start);
if (start < 0 || end < 0) {
  console.error("script.js の siteData が見つかりませんでした。");
  process.exit(1);
}
const siteData = new Function(`${source.slice(start, end + 3)} return siteData;`)();
const stages = siteData.game.stages;

const SOLID = new Set(["#", "B"]);
const FLOOR = new Set(["#", "B", "="]);
const DEADLY = new Set(["^"]);
/* 立てる足場から、上へ何マスまで届くか（0〜3マス上）と、そのときの横の最大距離 */
const REACH = [4, 4, 3, 2];
const PAD_RISE = 6;
const PAD_DX = 3;
const FALL_DX = 5;

let failed = 0;

stages.forEach((stage, index) => {
  const label = `stage ${index + 1} 「${stage.name}」`;
  const rows = stage.map;
  const problems = [];
  const warnings = [];

  const width = rows[0].length;
  rows.forEach((row, r) => {
    if (row.length !== width) problems.push(`${r} 行目の長さが ${row.length}（他は ${width}）`);
  });

  const grid = rows.map((row) => row.split(""));
  const height = grid.length;
  const at = (c, r) => (r < 0 || r >= height || c < 0 || c >= width ? "#" : grid[r][c]);

  const count = (ch) => rows.join("").split(ch).length - 1;
  if (count("P") !== 1) problems.push(`P が ${count("P")} 個（1個にしてください）`);
  if (count("G") !== 1) problems.push(`G が ${count("G")} 個（1個にしてください）`);

  /* 動く床が通る道も、立てる場所として数える */
  const movingFloor = new Set();
  for (let r = 0; r < height; r += 1) {
    for (let c = 0; c < width; c += 1) {
      if (at(c, r) === "M") {
        let e = c;
        while (at(e + 1, r) === "-") e += 1;
        for (let k = c; k <= e + 2 && k < width; k += 1) movingFloor.add(`${k},${r}`);
      }
      if (at(c, r) === "V") {
        let top = r;
        let bottom = r;
        while (at(c, top - 1) === "|") top -= 1;
        while (at(c, bottom + 1) === "|") bottom += 1;
        for (let k = top; k <= bottom; k += 1) {
          movingFloor.add(`${c - 1},${k}`);
          movingFloor.add(`${c},${k}`);
        }
      }
    }
  }

  const standable = (c, r) => {
    if (r < 0 || r >= height || c < 0 || c >= width) return false;
    if (DEADLY.has(at(c, r))) return false;
    if (SOLID.has(at(c, r))) return false;
    if (movingFloor.has(`${c},${r}`)) return true;
    return FLOOR.has(at(c, r + 1));
  };

  const spawn = findChar("P");
  const goal = findChar("G");

  function findChar(ch) {
    for (let r = 0; r < height; r += 1) {
      for (let c = 0; c < width; c += 1) {
        if (grid[r][c] === ch) return { c, r };
      }
    }
    return null;
  }

  const reached = new Set();
  if (spawn) {
    const queue = [];
    const push = (c, r) => {
      const key = `${c},${r}`;
      if (reached.has(key) || !standable(c, r)) return;
      reached.add(key);
      queue.push({ c, r });
    };
    let seed = spawn.r;
    while (seed < height && !standable(spawn.c, seed)) seed += 1;
    push(spawn.c, seed);

    while (queue.length) {
      const node = queue.shift();
      const onPad = at(node.c, node.r + 1) === "B";
      for (let rise = 0; rise <= (onPad ? PAD_RISE : REACH.length - 1); rise += 1) {
        const dxMax = onPad && rise >= REACH.length ? PAD_DX : REACH[Math.min(rise, REACH.length - 1)];
        for (let dx = -dxMax; dx <= dxMax; dx += 1) {
          push(node.c + dx, node.r - rise);
        }
      }
      for (let drop = 1; drop < height; drop += 1) {
        for (let dx = -FALL_DX; dx <= FALL_DX; dx += 1) {
          push(node.c + dx, node.r + drop);
        }
      }
    }
  }

  if (goal && !reached.has(`${goal.c},${goal.r}`)) {
    problems.push("ゴール G までたどり着けません（足場が足りないか、段差が高すぎます）");
  }

  let lostCoins = 0;
  for (let r = 0; r < height; r += 1) {
    for (let c = 0; c < width; c += 1) {
      if (grid[r][c] !== "o") continue;
      /* 足場の上をジャンプで通り抜ければ取れる、とみなす */
      let near = false;
      for (let rise = 0; rise <= REACH.length && !near; rise += 1) {
        const dxMax = REACH[Math.min(rise, REACH.length - 1)];
        for (let dx = -dxMax; dx <= dxMax; dx += 1) {
          if (reached.has(`${c + dx},${r + rise}`)) {
            near = true;
            break;
          }
        }
      }
      if (!near) lostCoins += 1;
    }
  }
  if (lostCoins) warnings.push(`取れないアイテムが ${lostCoins} 個あります`);

  if (problems.length) {
    failed += 1;
    console.log(`NG  ${label}`);
    problems.forEach((line) => console.log(`      - ${line}`));
  } else {
    console.log(`OK  ${label}  ${width} x ${height}  アイテム ${count("o")}  敵 ${count("E") + count("F")}`);
  }
  warnings.forEach((line) => console.log(`      ! ${line}`));
});

if (failed) {
  console.log(`\n${failed} 個のステージに問題があります。`);
  process.exit(1);
}
console.log("\nすべてのステージをクリアできます。");
