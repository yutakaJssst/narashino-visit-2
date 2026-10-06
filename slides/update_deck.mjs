import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const [sourceArg, outputArg, sessionArg, referenceSha256, expectedSlideSize = "12192000,6858000"] = process.argv.slice(2);
if (!sourceArg || !outputArg || !["1", "2"].includes(sessionArg) || !referenceSha256) {
  throw new Error("Usage: node update_deck.mjs SOURCE_PPTX OUTPUT_PPTX SESSION REFERENCE_SHA256 [EXPECTED_SLIDE_SIZE_EMU]");
}

const skillDir = process.env.SKILL_DIR;
const runtimePython = process.env.RUNTIME_PYTHON;
if (!skillDir || !runtimePython) {
  throw new Error("SKILL_DIR and RUNTIME_PYTHON are required");
}

const slidesDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.resolve(slidesDir, "..");
const sourcePath = path.resolve(sourceArg);
const finalPath = path.resolve(outputArg);
const session = Number(sessionArg);
const stagingDir = path.join(workspaceDir, ".codex-slides");

await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(finalPath), { recursive: true });

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));

const replacements = [
  ["AIと20分で、", "AIと30分で、"],
  ["日習のホームページを作る", "明和県央のホームページを作る"],
  ["2026年9月8日　日本大学習志野高等学校 1学年 学部見学会", "2026年10月6日　明和県央高等学校 1学年 見学会"],
  ["みなさんの学校と、同じキャンパスの中にあります", "今日の会場は、船橋キャンパスです"],
  ["船橋日大前駅から歩いて5分。日大習志野高校の校舎も、この地図の中にあります", "14号館でミニ講義。2号館が応用情報工学科の研究・教育の拠点です"],
  ["Students' Work", "Live Creation"],
  ["日習の先輩が、この学科で一緒に作っています", "このあと、みなさんとゲームを作ります"],
  ["CSTコースの皆さんの作品。高校にいながら、理工学部の授業を受けられます。（クリックで再生・30秒）", "学校のいいところ、色、敵の名前。みなさんの言葉を、その場でAIに伝えます。"],
  ["6年前の作品です。当時はUnityの使い方を覚えるところから始めて、半年かかりました", "言葉を伝えると、AIがサイトとゲームを書き換えます。"],
  ["20分で、日習のホームページを作ります", "30分で、明和県央のホームページを作ります"],
  ["AIが昨日つくったサイトを見る", "AIが準備したサイトを見る"],
  ["みなさんに、日習のいいところを聞く", "みなさんに、明和県央のいいところを聞く"],
  ["日習のいいところは？", "明和県央のいいところは？"],
  ["売店で一番買うものは？", "給食で好きなメニューは？"],
  ["サイトの色は何色にする？", "学校らしい色は何色？"],
  ["「人工芝がいい」", "「C-HALLがいい」"],
  ["「売店のパンがうまい」", "「部活が楽しい」"],
  ["日大習志野高校の1年生に聞いた内容を、", "明和県央高校の1年生に聞いた内容を、"],
  ["・魅力の3つを「人工芝」「売店」「図書室」にする", "・魅力の3つを「C-HALL」「部活」「広い校地」にする"],
  ["・ゲームの敵の名前を「小テスト」「宿題」にする", "・敵の名前を「小テスト」「寝坊」にする"],
  ["きのうの1時間40分。作業の記録（Gitの履歴）から、そのままの時刻です", "サイトを作ったときの記録（Gitの履歴）から、実際の指示を見てみます"],
  ["「20分ずつ、2回。リポジトリを分けて作って」", "「30分ずつ、2回。リポジトリを分けて作って」"],
  ["日習のサイトの下地ができた", "学校紹介サイトの下地ができた"],
  ["この18枚ができた", "この17枚ができた"],
  ["半年かかったことが、いまは数十分です", "半年かかったゲームが、いまは数十分です"],
  ["6年前", "以前"],
  ["先輩たちの作品", "ゲーム制作"],
  ["2026年9月", "2026年10月"],
  ["今日、この20分", "今日、この30分"],
  ["AIは日習のことを何も知りませんでした。知っているのは、みなさんだけです", "AIは明和県央のことを何も知りませんでした。知っているのは、みなさんだけです"],
  ["AIは日習を知らない。決めて、聞いて、確かめるのはみなさん", "AIは明和県央を知らない。決めて、聞いて、確かめるのはみなさん"],
  ["1回目のみなさんへ　放課後でも、家でも開けます", "B班（13:00）のみなさんへ　放課後でも、家でも開けます"],
  ["2回目のみなさんへ　放課後でも、家でも開けます", "A班（14:00）のみなさんへ　放課後でも、家でも開けます"],
];

const snapshot = await presentation.inspect({
  kind: "slide,textbox,image,notes",
  maxChars: 80000,
});
const records = snapshot.ndjson
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));

for (const record of records.filter((item) => item.kind === "textbox")) {
  let current = record.text ?? "";
  for (const [from, to] of replacements) {
    if (!current.includes(from)) continue;
    const target = presentation.resolve(record.id);
    target.text.replace(from, to);
    current = current.replace(from, to);
  }
}

async function replaceImage(slideNumber, preferredName, imagePath, alt, fit) {
  const record = records.find(
    (item) => item.kind === "image" && item.slide === slideNumber && item.name === preferredName,
  );
  if (!record) throw new Error(`Image not found on slide ${slideNumber}: ${preferredName}`);
  const image = presentation.resolve(record.id);
  const placement = {
    frame: image.frame,
    crop: image.crop,
    geometry: image.geometry,
    borderRadius: image.borderRadius,
    rotation: image.rotation,
    flipHorizontal: image.flipHorizontal,
    flipVertical: image.flipVertical,
    lockAspectRatio: image.lockAspectRatio,
  };
  image.replace({
    blob: new Uint8Array(await fs.readFile(imagePath)),
    contentType: "image/png",
    alt,
    fit,
  });
  image.frame = placement.frame;
  image.crop = undefined;
  image.geometry = placement.geometry;
  image.borderRadius = placement.borderRadius;
  image.rotation = placement.rotation;
  image.flipHorizontal = placement.flipHorizontal;
  image.flipVertical = placement.flipVertical;
  image.lockAspectRatio = placement.lockAspectRatio;
}

await replaceImage(
  3,
  "Picture 10",
  path.join(slidesDir, "images/campus_venue.png"),
  "日本大学理工学部 船橋キャンパスの案内図。船橋日大前駅、14号館、2号館を表示",
  "contain",
);
await replaceImage(
  5,
  "nichinara_work.mp4",
  path.join(slidesDir, "images/ai_game_collaboration.png"),
  "高校生がAIと一緒に横スクロールゲームを作るイラスト",
  "cover",
);

for (const slideNumber of [1, 3, 5]) {
  const note = records.find((item) => item.kind === "notes" && item.slide === slideNumber);
  if (!note) continue;
  const notes = presentation.resolve(note.id);
  if (slideNumber === 1) {
    notes.setText("日程・参加人数の出典: 添付PDF「（船橋）1006明和県央.pdf」。");
  } else if (slideNumber === 3) {
    notes.setText("地図の元画像: 日本大学理工学部 船橋キャンパス案内図。今回不要な前回校の注記のみAI画像編集で除去。");
  } else {
    notes.setText("画像: OpenAIの画像生成機能で作成した、架空の高校生とAIによるゲーム制作のイラスト。");
  }
}

const after = await presentation.inspect({ kind: "textbox", maxChars: 80000 });
if (/日習|日本大学習志野|日大習志野|今日、この20分|AIと20分|人工芝がいい|売店のパン/.test(after.ndjson)) {
  throw new Error("Old school or duration text remains in the deck");
}

const { finalizePresentation } = await import(
  pathToFileURL(path.join(skillDir, "container_tools/artifact_tool_utils.mjs")).href,
);
const candidatePath = path.join(stagingDir, `candidate-session-${session}.pptx`);
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

await finalizePresentation({
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: runtimePython,
  integrityValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", expectedSlideSize,
    "--validate-bullet-geometry",
    "--validate-heading-fit",
  ],
  explicitTotalSlideCount: 17,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  fontPolicy: {
    basis: "reference",
    families: ["Hiragino Mincho ProN", "Hiragino Kaku Gothic ProN", "Menlo"],
    referencePath: sourcePath,
    referenceSha256,
  },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, `${path.basename(finalPath)}.validation.json`),
});
