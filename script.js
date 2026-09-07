const siteData = {
  schoolName: "日本大学習志野高等学校",
  shortName: "日大習志野",
  area: "日本大学理工学部 船橋キャンパスの中にある、日本大学の付属高校",
  tagline: "スクールミッションは「自主創造」。自ら学ぶ、自ら考える、自ら道をひらく。",
  theme: {
    brand: "#1d4f9c",
    accent: "#f0654f",
    mint: "#3f9e63",
    gold: "#f7b801",
    sand: "#f2e8d9"
  },
  stats: [
    { value: "自主創造", label: "スクールミッション" },
    { value: "徒歩5分", label: "船橋日大前駅 西口から" },
    { value: "32部", label: "運動部16・文化部16" }
  ],
  features: [
    {
      symbol: "01",
      title: "大学キャンパスの中にある高校",
      body: "校舎は日本大学理工学部 船橋キャンパスの中。3階の小ラウンジからはキャンパスが一望できます。"
    },
    {
      symbol: "02",
      title: "人工芝グラウンドと照明付きテニスコート",
      body: "人工芝のグラウンド、照明付きのオムニコート3面、タータンの練習走路。部活動も体育も思いきり動けます。"
    },
    {
      symbol: "03",
      title: "高校にいながら大学の授業",
      body: "CSTコースでは理工学部の授業を高校のうちから受けられ、進学後の単位にもなります。"
    }
  ],
  learning: {
    title: "1年生は同じスタート。2年生からNP・GA・CSTの3コースへ。",
    body: "1年次は平均化クラスで基礎を固め、2年次からNP（国公立進学）・GA（総合進学）・CST（日本大学理工学部進学）に分かれます。ICT教育やオーストラリア語学研修など、幅広い学びが用意されています。",
    activities: ["高大連携", "ICT教育", "グローバル教育"]
  },
  voices: [
    {
      initial: "？",
      name: "1年生",
      role: "みんなの声 募集中",
      quote: "日大習志野のいいところ、教えてください。ここに君たちの言葉が入ります。"
    },
    {
      initial: "？",
      name: "1年生",
      role: "みんなの声 募集中",
      quote: "好きな場所、好きな時間、自慢したいこと。なんでもOKです。"
    },
    {
      initial: "？",
      name: "1年生",
      role: "みんなの声 募集中",
      quote: "AIは公式サイトの情報しか知りません。本当の日習は、君たちしか知りません。"
    }
  ],
  events: [
    {
      month: "5月",
      title: "体育祭",
      body: "クラスの団結が試される体育祭。仲間と力を合わせて競い合います。"
    },
    {
      month: "9月",
      title: "校外研修II 日本大学学部見学会",
      body: "1年生が日本大学の学部を見学。理工学部船橋キャンパスで模擬講義や施設見学を体験します。"
    },
    {
      month: "11月",
      title: "文化祭",
      body: "クラス展示や文化部の発表など、学校中が一年でいちばん華やぐ日です。"
    },
    {
      month: "2月",
      title: "修学旅行",
      body: "2年生の修学旅行。学年みんなで出かける、高校生活の大きな思い出です。"
    }
  ],
  game: {
    title: "キャンパスルート＆売店チャレンジ",
    body: "船橋日大前駅の西口から、日大理工キャンパスの緑の中を抜けて、日大習志野高校へ向かうミニゲームです。道中の障害物をジャンプで避けよう。",
    playerLabel: "AI",
    startLabel: "船橋日大前駅",
    goalLabel: "日大習志野",
    routeNote: "東葉高速線 船橋日大前駅 西口から徒歩5分",
    routeItems: ["自主", "創造", "高大連携", "部活"],
    obstacles: ["信号", "忘れ物", "寄り道"],
    cafeteria: {
      body: "学校に着いたら生徒ラウンジの売店タイムアタック！トレイをドラッグして、お昼ごはんと友だちをできるだけ集めよう。",
      arriveLabel: "生徒ラウンジに到着!",
      timeLimit: 12,
      menuItems: ["お弁当", "パン", "おにぎり", "ジュース", "文房具"],
      friendLabel: "友だち"
    }
  }
};

const root = document.documentElement;
root.style.setProperty("--brand", siteData.theme.brand);
root.style.setProperty("--brand-dark", shadeColor(siteData.theme.brand, -28));
root.style.setProperty("--accent", siteData.theme.accent);
root.style.setProperty("--mint", siteData.theme.mint);
root.style.setProperty("--gold", siteData.theme.gold);
root.style.setProperty("--sand", siteData.theme.sand);

const textBindings = [
  ["[data-school-name]", siteData.schoolName],
  ["[data-school-name-short]", siteData.shortName],
  ["[data-school-name-short-footer]", siteData.shortName],
  ["[data-school-area]", siteData.area],
  ["[data-school-tagline]", siteData.tagline],
  ["[data-learning-title]", siteData.learning.title],
  ["[data-learning-body]", siteData.learning.body],
  ["[data-game-title]", siteData.game.title],
  ["[data-game-body]", siteData.game.body],
  ["[data-cafeteria-body]", siteData.game.cafeteria.body]
];

textBindings.forEach(([selector, value]) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
});

document.title = `${siteData.shortName} | AIと作る学校紹介サイト`;

siteData.stats.forEach((stat, index) => {
  const value = document.querySelector(`[data-stat-value="${index}"]`);
  const label = document.querySelector(`[data-stat-label="${index}"]`);
  if (value) value.textContent = stat.value;
  if (label) label.textContent = stat.label;
});

siteData.learning.activities.forEach((activity, index) => {
  const element = document.querySelector(`[data-activity="${index}"]`);
  if (element) element.textContent = activity;
});

renderCards();
initCampusCanvas();
initGame();

function renderCards() {
  const featureGrid = document.querySelector("[data-feature-grid]");
  const voiceGrid = document.querySelector("[data-voice-grid]");
  const eventList = document.querySelector("[data-event-list]");

  featureGrid.innerHTML = siteData.features
    .map(
      (feature) => `
        <article class="feature-card">
          <span class="feature-symbol">${escapeHtml(feature.symbol)}</span>
          <div>
            <h3>${escapeHtml(feature.title)}</h3>
            <p>${escapeHtml(feature.body)}</p>
          </div>
        </article>
      `
    )
    .join("");

  voiceGrid.innerHTML = siteData.voices
    .map(
      (voice) => `
        <article class="voice-card">
          <div class="voice-meta">
            <span class="avatar">${escapeHtml(voice.initial)}</span>
            <div>
              <strong>${escapeHtml(voice.name)}</strong>
              <span>${escapeHtml(voice.role)}</span>
            </div>
          </div>
          <p>${escapeHtml(voice.quote)}</p>
        </article>
      `
    )
    .join("");

  eventList.innerHTML = siteData.events
    .map(
      (event) => `
        <article class="event-item">
          <span class="event-month">${escapeHtml(event.month)}</span>
          <div>
            <h3>${escapeHtml(event.title)}</h3>
            <p>${escapeHtml(event.body)}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function initCampusCanvas() {
  const canvas = document.querySelector("#campusCanvas");
  const context = canvas.getContext("2d");
  const pointer = { x: 0.5, y: 0.5 };
  let width = 0;
  let height = 0;
  let deviceRatio = 1;
  let startTime = performance.now();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * deviceRatio);
    canvas.height = Math.floor(height * deviceRatio);
    context.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);
  };

  const draw = (now) => {
    const t = (now - startTime) / 1000;
    context.clearRect(0, 0, width, height);

    drawSky(context, width, height);
    drawSun(context, width, height, t);
    drawClouds(context, width, height, t, pointer.x);
    drawGround(context, width, height);
    drawCampus(context, width, height, pointer);
    drawStudents(context, width, height, t);

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX / Math.max(window.innerWidth, 1);
    pointer.y = event.clientY / Math.max(window.innerHeight, 1);
  });

  resize();
  requestAnimationFrame(draw);
}

function drawSky(ctx, width, height) {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#b9ecff");
  sky.addColorStop(0.45, "#e7f9ff");
  sky.addColorStop(1, "#fff8eb");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);
}

function drawSun(ctx, width, height, t) {
  const x = width * 0.78;
  const y = height * 0.16 + Math.sin(t * 0.5) * 5;
  const radius = Math.max(48, Math.min(width, height) * 0.095);
  const halo = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius * 2.2);
  halo.addColorStop(0, "rgba(248, 193, 74, 0.75)");
  halo.addColorStop(1, "rgba(248, 193, 74, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = siteData.theme.gold;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawClouds(ctx, width, height, t, pointerX) {
  const clouds = [
    { x: 0.58, y: 0.18, s: 1.1, speed: 12 },
    { x: 0.84, y: 0.32, s: 0.82, speed: 9 },
    { x: 0.42, y: 0.27, s: 0.72, speed: 7 }
  ];

  clouds.forEach((cloud, index) => {
    const travel = ((t * cloud.speed + pointerX * 20 + index * 140) % (width + 280)) - 140;
    const x = cloud.x * width + travel - width * 0.45;
    const y = cloud.y * height;
    const size = 54 * cloud.s;
    ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
    blob(ctx, x, y, size, [
      [-0.7, 0.12, 0.68],
      [-0.26, -0.12, 0.86],
      [0.28, -0.04, 0.72],
      [0.72, 0.16, 0.54]
    ]);
  });
}

function drawGround(ctx, width, height) {
  const horizonY = height * 0.56;
  const lawnY = height * 0.76;

  const grove = ctx.createLinearGradient(0, horizonY, 0, lawnY);
  grove.addColorStop(0, "#a9dcae");
  grove.addColorStop(0.56, "#57b26b");
  grove.addColorStop(1, "#def2d0");
  ctx.fillStyle = grove;
  ctx.fillRect(0, horizonY, width, lawnY - horizonY);

  ctx.fillStyle = "rgba(40, 120, 74, 0.32)";
  for (let y = horizonY + 22; y < lawnY - 12; y += 34) {
    for (let x = 8; x <= width + 20; x += 58) {
      const treeX = x + ((y * 7) % 29);
      ctx.beginPath();
      ctx.arc(treeX, y, 13, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const path = ctx.createLinearGradient(0, lawnY, 0, height);
  path.addColorStop(0, "#faf3e2");
  path.addColorStop(1, siteData.theme.sand);
  ctx.fillStyle = path;
  ctx.fillRect(0, lawnY, width, height - lawnY);

  ctx.fillStyle = "rgba(255, 255, 255, 0.68)";
  ctx.beginPath();
  ctx.moveTo(0, lawnY + 4);
  for (let x = 0; x <= width + 20; x += 36) {
    ctx.quadraticCurveTo(x + 18, lawnY + 17, x + 36, lawnY + 5);
  }
  ctx.lineTo(width, lawnY + 32);
  ctx.lineTo(0, lawnY + 32);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(63, 158, 99, 0.16)";
  ctx.fillRect(0, lawnY + 50, width, 5);
}

function drawCampus(ctx, width, height, pointer) {
  const baseY = height * 0.77;
  const buildingW = Math.min(width * 0.38, 560);
  const buildingH = Math.min(height * 0.24, 220);
  const x = width * 0.64 + (pointer.x - 0.5) * 18;
  const y = baseY - buildingH;
  const left = x - buildingW / 2;

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, left, y, buildingW, buildingH, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(23, 32, 51, 0.18)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = siteData.theme.brand;
  roundRect(ctx, left + buildingW * 0.38, y - buildingH * 0.18, buildingW * 0.24, buildingH * 0.2, 8);
  ctx.fill();

  ctx.fillStyle = "#f4f8ff";
  ctx.fillRect(left + buildingW * 0.42, y - buildingH * 0.13, buildingW * 0.16, buildingH * 0.08);

  const rows = 3;
  const columns = 7;
  const gapX = buildingW * 0.055;
  const gapY = buildingH * 0.12;
  const windowW = buildingW * 0.075;
  const windowH = buildingH * 0.12;
  const startX = left + buildingW * 0.08;
  const startY = y + buildingH * 0.18;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const wx = startX + col * (windowW + gapX);
      const wy = startY + row * (windowH + gapY);
      ctx.fillStyle = (row + col) % 3 === 0 ? "#ffe8a8" : "#ccecff";
      roundRect(ctx, wx, wy, windowW, windowH, 4);
      ctx.fill();
    }
  }

  ctx.fillStyle = siteData.theme.accent;
  roundRect(ctx, left + buildingW * 0.45, baseY - buildingH * 0.21, buildingW * 0.1, buildingH * 0.21, 6);
  ctx.fill();

  ctx.fillStyle = "rgba(23, 32, 51, 0.72)";
  ctx.font = `900 ${Math.max(13, buildingW * 0.032)}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(siteData.shortName, left + buildingW * 0.5, y + buildingH * 0.12);

  drawTree(ctx, left - 70, baseY + 4, 1.2);
  drawTree(ctx, left + buildingW + 62, baseY + 8, 1.05);
}

function drawStudents(ctx, width, height, t) {
  const baseY = height * 0.78;
  const students = [
    { x: 0.62, color: siteData.theme.brand, phase: 0 },
    { x: 0.7, color: siteData.theme.accent, phase: 1.8 },
    { x: 0.78, color: siteData.theme.mint, phase: 3.2 }
  ];

  students.forEach((student) => {
    const x = width * student.x + Math.sin(t * 1.5 + student.phase) * 14;
    const y = baseY + Math.sin(t * 3 + student.phase) * 2;
    ctx.fillStyle = "#24304a";
    ctx.beginPath();
    ctx.arc(x, y - 38, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = student.color;
    roundRect(ctx, x - 11, y - 28, 22, 30, 6);
    ctx.fill();
    ctx.strokeStyle = "#24304a";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - 6, y + 2);
    ctx.lineTo(x - 14, y + 24);
    ctx.moveTo(x + 6, y + 2);
    ctx.lineTo(x + 16, y + 24);
    ctx.stroke();
  });
}

function drawTree(ctx, x, baseY, scale) {
  ctx.fillStyle = "#7b5b45";
  roundRect(ctx, x - 8 * scale, baseY - 74 * scale, 16 * scale, 74 * scale, 5 * scale);
  ctx.fill();
  ctx.fillStyle = siteData.theme.mint;
  blob(ctx, x, baseY - 88 * scale, 42 * scale, [
    [-0.55, 0.08, 0.78],
    [0, -0.3, 0.92],
    [0.52, 0.08, 0.76],
    [0.05, 0.35, 0.7]
  ]);
}

function initGame() {
  const canvas = document.querySelector("#gameCanvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.querySelector("[data-start-game]");
  const jumpButton = document.querySelector("[data-jump]");
  const scoreElement = document.querySelector("[data-score]");
  const bestElement = document.querySelector("[data-best-score]");
  const menuCountElement = document.querySelector("[data-menu-count]");
  const friendCountElement = document.querySelector("[data-friend-count]");
  const bestKey = "high-school-visit-route-best-score";
  const cafeteriaTotalTime = Math.round(siteData.game.cafeteria.timeLimit * 60);

  const state = {
    phase: "route",
    running: false,
    gameOver: false,
    arrived: false,
    score: 0,
    best: Number(localStorage.getItem(bestKey) || 0),
    speed: 4.8,
    frame: 0,
    distance: 0,
    finishDistance: 2600,
    ground: 330,
    player: {
      x: 104,
      y: 282,
      width: 54,
      height: 54,
      velocityY: 0,
      grounded: true
    },
    obstacles: [],
    collectibles: [],
    cafeteria: {
      transition: 0,
      totalTime: cafeteriaTotalTime,
      timeLeft: 0,
      spawnTimer: 0,
      itemsSpawned: 0,
      items: [],
      menuCount: 0,
      friendCount: 0,
      playerX: canvas.width / 2,
      targetX: canvas.width / 2
    }
  };

  bestElement.textContent = state.best;

  const reset = () => {
    state.phase = "route";
    state.running = true;
    state.gameOver = false;
    state.arrived = false;
    state.score = 0;
    state.speed = 4.8;
    state.frame = 0;
    state.distance = 0;
    state.obstacles = [];
    state.collectibles = [];
    state.player.y = state.ground - state.player.height;
    state.player.velocityY = 0;
    state.player.grounded = true;
    state.cafeteria.transition = 0;
    state.cafeteria.timeLeft = 0;
    state.cafeteria.spawnTimer = 0;
    state.cafeteria.itemsSpawned = 0;
    state.cafeteria.items = [];
    state.cafeteria.menuCount = 0;
    state.cafeteria.friendCount = 0;
    state.cafeteria.playerX = canvas.width / 2;
    state.cafeteria.targetX = canvas.width / 2;
    startButton.textContent = "リスタート";
    jumpButton.hidden = false;
    scoreElement.textContent = state.score;
    menuCountElement.textContent = 0;
    friendCountElement.textContent = 0;
  };

  const jump = () => {
    if (!state.running) {
      reset();
      return;
    }

    if (state.phase !== "route" || state.gameOver) return;

    if (state.player.grounded) {
      state.player.velocityY = -14.4;
      state.player.grounded = false;
    }
  };

  const moveTrayTo = (clientX) => {
    if (state.phase !== "cafeteria") return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const x = (clientX - rect.left) * scaleX;
    state.cafeteria.targetX = clamp(x, 60, canvas.width - 60);
  };

  startButton.addEventListener("click", reset);
  jumpButton.addEventListener("click", jump);
  canvas.addEventListener("pointerdown", (event) => {
    jump();
    moveTrayTo(event.clientX);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (event.pressure === 0 && event.pointerType === "mouse") return;
    moveTrayTo(event.clientX);
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "ArrowUp") {
      event.preventDefault();
      jump();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      if (state.phase === "cafeteria" && state.running) {
        event.preventDefault();
        const dir = event.key === "ArrowLeft" ? -1 : 1;
        state.cafeteria.targetX = clamp(state.cafeteria.targetX + dir * 46, 60, canvas.width - 60);
      }
    }
  });

  const loop = () => {
    updateGame(state);
    drawGame(ctx, canvas, state);
    requestAnimationFrame(loop);
  };

  drawGame(ctx, canvas, state);
  requestAnimationFrame(loop);

  function updateGame(game) {
    if (!game.running) return;
    if (game.phase === "route") {
      updateRoute(game);
    } else if (game.phase === "cafeteria") {
      updateCafeteria(game);
    }
  }

  function updateRoute(game) {
    if (game.gameOver) return;

    game.frame += 1;
    game.score += 1;
    game.distance += game.speed;
    game.speed = Math.min(11, game.speed + 0.0028);
    scoreElement.textContent = Math.floor(game.score / 6);

    if (game.distance >= game.finishDistance) {
      arriveGame(game);
      return;
    }

    game.player.velocityY += 0.74;
    game.player.y += game.player.velocityY;

    const floor = game.ground - game.player.height;
    if (game.player.y >= floor) {
      game.player.y = floor;
      game.player.velocityY = 0;
      game.player.grounded = true;
    }

    if (game.frame % 96 === 0 && routeProgress(game) < 0.92) {
      game.obstacles.push({
        x: canvas.width + 28,
        y: game.ground - 42,
        width: 42,
        height: 42,
        label: pick(siteData.game.obstacles, game.frame / 96)
      });
    }

    if (game.frame % 74 === 0 && routeProgress(game) < 0.95) {
      game.collectibles.push({
        x: canvas.width + 34,
        y: game.ground - 118 - Math.random() * 88,
        radius: 16,
        collected: false,
        label: pick(siteData.game.routeItems, game.frame / 74)
      });
    }

    game.obstacles.forEach((obstacle) => {
      obstacle.x -= game.speed;
      if (intersects(game.player, obstacle, 8)) {
        endGame(game);
      }
    });

    game.collectibles.forEach((item) => {
      item.x -= game.speed;
      if (!item.collected && circleIntersectsRect(item, game.player)) {
        item.collected = true;
        game.score += 84;
      }
    });

    game.obstacles = game.obstacles.filter((obstacle) => obstacle.x > -80);
    game.collectibles = game.collectibles.filter((item) => item.x > -80 && !item.collected);
  }

  function updateCafeteria(game) {
    const cafe = game.cafeteria;

    if (cafe.transition > 0) {
      cafe.transition -= 1;
      return;
    }

    cafe.timeLeft -= 1;
    if (cafe.timeLeft <= 0) {
      finishCafeteria(game);
      return;
    }

    cafe.playerX += (cafe.targetX - cafe.playerX) * 0.22;

    cafe.spawnTimer -= 1;
    if (cafe.spawnTimer <= 0) {
      const isFriend = Math.random() < 0.4;
      cafe.items.push({
        x: 70 + Math.random() * (canvas.width - 140),
        y: -20,
        vy: 2.8 + Math.random() * 1.6,
        type: isFriend ? "friend" : "menu",
        label: isFriend
          ? siteData.game.cafeteria.friendLabel
          : pick(siteData.game.cafeteria.menuItems, cafe.itemsSpawned),
        caught: false
      });
      cafe.itemsSpawned += 1;
      cafe.spawnTimer = 32 + Math.random() * 18;
    }

    const trayTop = game.ground - 40;
    cafe.items.forEach((item) => {
      item.y += item.vy;
      if (!item.caught && item.y >= trayTop && item.y <= game.ground && Math.abs(item.x - cafe.playerX) < 46) {
        item.caught = true;
        if (item.type === "friend") {
          cafe.friendCount += 1;
          game.score += 60;
        } else {
          cafe.menuCount += 1;
          game.score += 40;
        }
      }
    });

    cafe.items = cafe.items.filter((item) => !item.caught && item.y < game.ground + 40);

    scoreElement.textContent = Math.floor(game.score / 6);
    menuCountElement.textContent = cafe.menuCount;
    friendCountElement.textContent = cafe.friendCount;
  }

  function endGame(game) {
    game.gameOver = true;
    game.running = false;
    const finalScore = Math.floor(game.score / 6);
    if (finalScore > game.best) {
      game.best = finalScore;
      localStorage.setItem(bestKey, String(game.best));
      bestElement.textContent = game.best;
    }
  }

  function arriveGame(game) {
    game.arrived = true;
    game.phase = "cafeteria";
    game.score += 240;
    game.cafeteria.transition = 60;
    game.cafeteria.timeLeft = game.cafeteria.totalTime;
    game.cafeteria.spawnTimer = 30;
    game.cafeteria.itemsSpawned = 0;
    game.cafeteria.items = [];
    game.cafeteria.menuCount = 0;
    game.cafeteria.friendCount = 0;
    game.cafeteria.playerX = canvas.width / 2;
    game.cafeteria.targetX = canvas.width / 2;
    jumpButton.hidden = true;
    scoreElement.textContent = Math.floor(game.score / 6);
  }

  function finishCafeteria(game) {
    game.running = false;
    game.phase = "results";
    const finalScore = Math.floor(game.score / 6);
    if (finalScore > game.best) {
      game.best = finalScore;
      localStorage.setItem(bestKey, String(game.best));
      bestElement.textContent = game.best;
    }
  }

}

function drawGame(ctx, canvas, state) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, "#d9f5ff");
  sky.addColorStop(0.55, "#fbfeff");
  sky.addColorStop(1, "#fff2cf");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (state.phase === "cafeteria" || state.phase === "results") {
    drawCafeteria(ctx, canvas, state);
  } else {
    drawRoute(ctx, canvas, state);
  }

  if (state.phase === "route" && !state.running && !state.gameOver) {
    drawCenterLabel(ctx, canvas, "START");
  }

  if (state.gameOver) {
    drawCenterLabel(ctx, canvas, "RETRY");
  }

  if (state.phase === "results") {
    drawResults(ctx, canvas, state);
  }
}

function drawRoute(ctx, canvas, state) {
  drawRouteBackground(ctx, canvas, state);
  drawRouteProgress(ctx, canvas, state);

  ctx.fillStyle = siteData.theme.sand;
  ctx.fillRect(0, state.ground, canvas.width, canvas.height - state.ground);

  ctx.strokeStyle = "rgba(23, 32, 51, 0.18)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, state.ground);
  ctx.lineTo(canvas.width, state.ground);
  ctx.stroke();

  ctx.fillStyle = "rgba(63, 158, 99, 0.22)";
  ctx.fillRect(0, state.ground + 70, canvas.width, 34);
  for (let x = -60; x < canvas.width + 80; x += 46) {
    const waveX = x - ((state.frame * 0.55) % 46);
    ctx.beginPath();
    ctx.arc(waveX, state.ground + 82, 18, 0, Math.PI);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  for (let x = -80; x < canvas.width + 120; x += 90) {
    const laneX = x - ((state.frame * state.speed) % 90);
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    roundRect(ctx, laneX, state.ground + 36, 42, 6, 3);
    ctx.fill();
  }

  state.collectibles.forEach((item) => {
    ctx.fillStyle = siteData.theme.gold;
    ctx.beginPath();
    ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#172033";
    ctx.font = "900 11px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("+", item.x, item.y + 1);
    ctx.font = "800 11px system-ui, sans-serif";
    ctx.fillText(item.label, item.x, item.y - 25);
  });

  state.obstacles.forEach((obstacle) => {
    drawEnemy(ctx, obstacle);
  });

  drawPlayer(ctx, state.player);
}

function drawEnemy(ctx, obstacle) {
  const cx = obstacle.x + obstacle.width / 2;
  const cy = obstacle.y + obstacle.height / 2;

  ctx.fillStyle = siteData.theme.accent;
  ctx.beginPath();
  ctx.ellipse(cx, cy, obstacle.width / 2, obstacle.height / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(cx - 8, cy - 4, 6, 0, Math.PI * 2);
  ctx.arc(cx + 8, cy - 4, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#172033";
  ctx.beginPath();
  ctx.arc(cx - 8, cy - 2, 2.6, 0, Math.PI * 2);
  ctx.arc(cx + 8, cy - 2, 2.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#172033";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy + 6, 6, 0, Math.PI);
  ctx.stroke();

  ctx.fillStyle = "#172033";
  ctx.font = "800 10px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(obstacle.label, cx, obstacle.y - 6);
}

function drawCafeteria(ctx, canvas, state) {
  const cafe = state.cafeteria;

  ctx.fillStyle = "rgba(247, 184, 1, 0.16)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = siteData.theme.sand;
  ctx.fillRect(0, state.ground, canvas.width, canvas.height - state.ground);
  ctx.strokeStyle = "rgba(23, 32, 51, 0.18)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, state.ground);
  ctx.lineTo(canvas.width, state.ground);
  ctx.stroke();

  cafe.items.forEach((item) => {
    ctx.fillStyle = item.type === "friend" ? siteData.theme.mint : siteData.theme.gold;
    ctx.beginPath();
    ctx.arc(item.x, item.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#172033";
    ctx.font = "900 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.type === "friend" ? "友" : "食", item.x, item.y + 1);
    ctx.font = "800 10px system-ui, sans-serif";
    ctx.fillText(item.label, item.x, item.y - 28);
  });

  const trayWidth = 60;
  const trayHeight = 40;
  const trayX = cafe.playerX - trayWidth / 2;
  const trayY = state.ground - trayHeight;
  ctx.fillStyle = siteData.theme.brand;
  roundRect(ctx, trayX, trayY, trayWidth, trayHeight, 10);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "900 12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("TRAY", cafe.playerX, trayY + trayHeight / 2);

  const barX = 58;
  const barWidth = canvas.width - 116;
  const timeRatio = clamp(cafe.timeLeft / cafe.totalTime, 0, 1);
  ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
  roundRect(ctx, barX, 24, barWidth, 20, 10);
  ctx.fill();
  ctx.fillStyle = siteData.theme.accent;
  roundRect(ctx, barX, 24, barWidth * timeRatio, 20, 10);
  ctx.fill();
  ctx.fillStyle = "#172033";
  ctx.font = "800 12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`のこり ${Math.ceil(clamp(cafe.timeLeft, 0, cafe.totalTime) / 60)}秒`, canvas.width / 2, 34);

  if (cafe.transition > 0) {
    drawCenterLabel(ctx, canvas, siteData.game.cafeteria.arriveLabel);
  }
}

function drawResults(ctx, canvas, state) {
  const cafe = state.cafeteria;
  ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
  roundRect(ctx, canvas.width / 2 - 150, canvas.height / 2 - 92, 300, 184, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(23, 32, 51, 0.16)";
  ctx.stroke();

  ctx.fillStyle = "#172033";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 20px system-ui, sans-serif";
  ctx.fillText("けっか発表！", canvas.width / 2, canvas.height / 2 - 56);

  ctx.font = "800 15px system-ui, sans-serif";
  ctx.fillText(`メニュー ${cafe.menuCount}種類`, canvas.width / 2, canvas.height / 2 - 20);
  ctx.fillText(`友だち ${cafe.friendCount}人`, canvas.width / 2, canvas.height / 2 + 8);

  ctx.font = "900 18px system-ui, sans-serif";
  ctx.fillStyle = siteData.theme.brand;
  ctx.fillText(`スコア ${Math.floor(state.score / 6)}`, canvas.width / 2, canvas.height / 2 + 42);

  ctx.font = "700 11px system-ui, sans-serif";
  ctx.fillStyle = "#5e6878";
  ctx.fillText("タップでもう一度", canvas.width / 2, canvas.height / 2 + 68);
}

function drawRouteBackground(ctx, canvas, state) {
  ctx.fillStyle = "rgba(0, 119, 182, 0.12)";
  for (let i = 0; i < 5; i += 1) {
    const x = ((i * 220 - state.frame * 0.8) % 1120) - 120;
    roundRect(ctx, x, 82 + i * 11, 110, 34, 18);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(63, 158, 99, 0.28)";
  roundRect(ctx, 36, 204, 120, 56, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 255, 0.68)";
  roundRect(ctx, 54, 220, 84, 8, 4);
  ctx.fill();

  ctx.fillStyle = "rgba(247, 184, 1, 0.3)";
  roundRect(ctx, canvas.width - 174, 196, 128, 74, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(23, 32, 51, 0.12)";
  for (let i = 0; i < 4; i += 1) {
    roundRect(ctx, canvas.width - 154 + i * 28, 215, 16, 16, 4);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(63, 158, 99, 0.85)";
  ctx.font = "900 15px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("船橋日大前", 42, 190);
}

function drawRouteProgress(ctx, canvas, state) {
  const x = 58;
  const y = 28;
  const width = canvas.width - 116;
  const height = 96;
  const progress = routeProgress(state);

  ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
  roundRect(ctx, x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(23, 32, 51, 0.14)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const routeY = y + 52;
  const startX = x + 66;
  const goalX = x + width - 72;
  const currentX = startX + (goalX - startX) * progress;

  ctx.strokeStyle = "rgba(23, 32, 51, 0.2)";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(startX, routeY);
  ctx.bezierCurveTo(x + width * 0.34, routeY - 28, x + width * 0.56, routeY + 28, goalX, routeY);
  ctx.stroke();

  ctx.strokeStyle = siteData.theme.brand;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(startX, routeY);
  ctx.lineTo(currentX, routeY);
  ctx.stroke();

  drawMapPin(ctx, startX, routeY, siteData.theme.brand, siteData.game.startLabel);
  drawMapPin(ctx, goalX, routeY, siteData.theme.accent, siteData.game.goalLabel);

  ctx.fillStyle = siteData.theme.gold;
  ctx.beginPath();
  ctx.arc(currentX, routeY, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#172033";
  ctx.font = "900 11px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GO", currentX, routeY + 1);

  ctx.fillStyle = "#5e6878";
  ctx.font = "800 13px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(siteData.game.routeNote, x + width / 2, y + height - 15);

  ctx.fillStyle = "#172033";
  ctx.font = "900 16px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${Math.round(progress * 100)}%`, x + width - 16, y + height - 14);
}

function drawMapPin(ctx, x, y, color, label) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#172033";
  ctx.font = "900 12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, x, y - 22);
}

function drawPlayer(ctx, player) {
  const x = player.x;
  const y = player.y;

  ctx.fillStyle = "rgba(23, 32, 51, 0.18)";
  ctx.beginPath();
  ctx.ellipse(x + 28, 334, 30, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = siteData.theme.brand;
  roundRect(ctx, x, y, player.width, player.height, 10);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, x + 10, y + 13, 34, 20, 6);
  ctx.fill();

  ctx.fillStyle = "#172033";
  ctx.beginPath();
  ctx.arc(x + 21, y + 23, 3, 0, Math.PI * 2);
  ctx.arc(x + 34, y + 23, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#172033";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 19, y + 37);
  ctx.lineTo(x + 15, y + 48);
  ctx.moveTo(x + 35, y + 37);
  ctx.lineTo(x + 39, y + 48);
  ctx.stroke();
}

function drawCenterLabel(ctx, canvas, label) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  roundRect(ctx, canvas.width / 2 - 86, canvas.height / 2 - 34, 172, 68, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(23, 32, 51, 0.16)";
  ctx.stroke();
  ctx.fillStyle = "#172033";
  ctx.font = "900 28px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 1);
}

function shadeColor(hex, percent) {
  const clean = hex.replace("#", "");
  const number = Number.parseInt(clean, 16);
  const amount = Math.round(2.55 * percent);
  const r = clamp((number >> 16) + amount, 0, 255);
  const g = clamp(((number >> 8) & 0x00ff) + amount, 0, 255);
  const b = clamp((number & 0x0000ff) + amount, 0, 255);
  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function routeProgress(state) {
  return clamp(state.distance / state.finishDistance, 0, 1);
}

function pick(items, index) {
  return items[Math.floor(index) % items.length];
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function blob(ctx, x, y, size, points) {
  ctx.beginPath();
  points.forEach(([px, py, scale], index) => {
    const cx = x + px * size;
    const cy = y + py * size;
    const radius = size * scale;
    if (index === 0) {
      ctx.moveTo(cx + radius, cy);
    }
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  });
  ctx.fill();
}

function intersects(a, b, padding = 0) {
  return (
    a.x + padding < b.x + b.width &&
    a.x + a.width - padding > b.x &&
    a.y + padding < b.y + b.height &&
    a.y + a.height - padding > b.y
  );
}

function circleIntersectsRect(circle, rect) {
  const closestX = clamp(circle.x, rect.x, rect.x + rect.width);
  const closestY = clamp(circle.y, rect.y, rect.y + rect.height);
  const distanceX = circle.x - closestX;
  const distanceY = circle.y - closestY;
  return distanceX * distanceX + distanceY * distanceY < circle.radius * circle.radius;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
