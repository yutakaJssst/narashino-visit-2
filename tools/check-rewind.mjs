import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../script.js", import.meta.url), "utf8");
const data = source.slice(0, source.indexOf("\n};") + 3);
const engine = source.slice(source.indexOf("function initGame()"));

function setup() {
  const canvas = { getContext: () => ({}), addEventListener() {} };
  const window = { addEventListener() {}, localStorage: { getItem: () => null } };
  const context = vm.createContext({
    window, structuredClone, performance, requestAnimationFrame() {},
    document: {
      querySelector: (selector) => selector === "#gameCanvas" ? canvas : null,
      querySelectorAll: () => []
    }
  });
  vm.runInContext(`${data}\n${engine}\ninitGame();`, context);
  const game = window.__game;
  game.mode = "play";
  return game;
}

function steps(game, count) {
  for (let i = 0; i < count; i++) game.step();
}

function miss(game) {
  game.player.invuln = 0;
  game.player.y = game.world.pxH + 100;
  game.step();
  assert.equal(game.mode, "hurt");
  const saved = structuredClone(game.history[0]);
  steps(game, 52);
  return saved;
}

const game = setup();
steps(game, 360);
assert.equal(game.history.length, 300);
const before = game.time;
const saved = miss(game);
assert.equal(game.time, before + 1 - 300);
assert.equal(game.lives, 2);
assert.equal(game.mode, "ready");
assert.equal(game.player.x, saved.player.x);
assert.equal(game.player.y, saved.player.y);
assert.deepEqual(game.world.enemies, saved.enemies);
assert.equal(game.history.length, 0);
assert.ok(game.player.invuln >= 90);

const early = setup();
steps(early, 30);
early.world.coins[0].taken = true;
early.items = 1;
early.world.checkpoints[0].hit = true;
early.world.spawn.x = 2000;
miss(early);
assert.equal(early.time, 0);
assert.equal(early.items, 0);
assert.equal(early.world.coins[0].taken, false);
assert.equal(early.world.checkpoints[0].hit, false);
assert.notEqual(early.world.spawn.x, 2000);
steps(early, 48);
steps(early, 100);
miss(early);
assert.equal(early.lives, 1);
assert.equal(early.time, 0);
steps(early, 48);
early.lives = 1;
miss(early);
assert.equal(early.mode, "over");
assert.equal(early.lives, 0);

const next = setup();
steps(next, 60);
next.mode = "clear";
next.overlay = 1;
next.step();
assert.equal(next.stageIndex, 1);
assert.equal(next.history.length, 0);
assert.equal(next.time, 0);
const platform = next.world.platforms[0];
next.mode = "play";
next.player.riding = platform;
next.step();
const platformStart = structuredClone(next.history[0].platforms);
steps(next, 20);
miss(next);
assert.deepEqual(next.world.platforms, platformStart);
assert.equal(next.player.riding, next.world.platforms[0]);
assert.equal(next.total, 60);
console.log("OK: 5秒巻き戻し・開始直後・連続ミス・残機・アイテム・中間地点・動く床・ステージ切替");
