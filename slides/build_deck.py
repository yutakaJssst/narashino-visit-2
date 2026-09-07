# -*- coding: utf-8 -*-
"""日大習志野高校 模擬講義（20分）用スライド。
デザインは応用情報工学科サイト（ce.cst.nihon-u.ac.jp）に合わせる。"""
import sys, os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

IMG = sys.argv[1]
OUT = sys.argv[2]
SESSION = int(sys.argv[3]) if len(sys.argv) > 3 else 1

PURPLE = RGBColor(0x91, 0x37, 0x7D)
VIOLET = RGBColor(0x59, 0x3F, 0xBF)
DEEP   = RGBColor(0x3D, 0x18, 0x36)
INK    = RGBColor(0x33, 0x33, 0x33)
MUTED  = RGBColor(0x77, 0x74, 0x78)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
PAPER  = RGBColor(0xF7, 0xF5, 0xF7)
LINE   = RGBColor(0xD9, 0xD3, 0xD8)

SERIF = "Hiragino Mincho ProN"
SANS  = "Hiragino Kaku Gothic ProN"
MONO  = "Menlo"

W, H = Inches(13.333), Inches(7.5)

prs = Presentation()
prs.slide_width, prs.slide_height = W, H
BLANK = prs.slide_layouts[6]


def set_run(run, text, font, size, color, bold=False, spacing=None):
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font
    rPr = run._r.get_or_add_rPr()
    for tag in ("a:ea", "a:cs"):
        el = rPr.makeelement(qn(tag), {"typeface": font})
        rPr.append(el)
    if spacing is not None:
        rPr.set("spc", str(int(spacing * 100)))


def textbox(slide, x, y, w, h, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    tf.paragraphs[0].alignment = align
    return tf


def line(tf, text, font, size, color, bold=False, spacing=None, space_before=0,
         align=None, line_spacing=None, first=False, raw=False):
    """raw=False のとき、行末の「。」を落とす。スライドの見出し・本文の作法に合わせる。
    文の途中の「。」はそのまま残す。実際に打ち込む文章など、原文のまま見せたいものは raw=True。"""
    if not raw and isinstance(text, str) and text.endswith("。"):
        text = text[:-1]
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    if align is not None:
        p.alignment = align
    if space_before:
        p.space_before = Pt(space_before)
    if line_spacing:
        p.line_spacing = line_spacing
    set_run(p.add_run(), text, font, size, color, bold, spacing)
    return p


def rect(slide, x, y, w, h, color, shape=MSO_SHAPE.RECTANGLE):
    s = slide.shapes.add_shape(shape, x, y, w, h)
    s.fill.solid()
    s.fill.fore_color.rgb = color
    s.line.fill.background()
    s.shadow.inherit = False
    return s


def gradient_bg(slide):
    s = rect(slide, 0, 0, W, H, PURPLE)
    f = s.fill
    f.gradient()
    f.gradient_stops[0].color.rgb = PURPLE
    f.gradient_stops[0].position = 0.0
    f.gradient_stops[1].color.rgb = VIOLET
    f.gradient_stops[1].position = 1.0
    f.gradient_angle = 20.0
    return s


def corner_mark(slide, dark=False):
    """サイトの斜めのあしらいを右下に置く"""
    s = slide.shapes.add_shape(MSO_SHAPE.RIGHT_TRIANGLE, Inches(11.5), Inches(6.1), Inches(1.9), Inches(1.4))
    s.fill.solid()
    s.fill.fore_color.rgb = WHITE if dark else PURPLE
    s.line.fill.background()
    s.shadow.inherit = False
    s.rotation = 180
    if not dark:
        from pptx.util import Emu as _E
        s.fill.fore_color.rgb = PURPLE
    return s


def logo(slide, x, y, w, name="logo_ce.png", plate=True):
    """公式ロゴを白い台紙の上に置く。白地の上では台紙は見えない。"""
    path = img(name)
    if not os.path.exists(path):
        return None
    from PIL import Image as PILImage
    iw, ih = PILImage.open(path).size
    h = int(w * ih / iw)
    if plate:
        pad = Inches(0.1)
        rect(slide, x - pad, y - pad, w + pad * 2, h + pad * 2, WHITE)
    slide.shapes.add_picture(path, x, y, w, h)
    return h


def footer(slide, n, dark=False):
    h = logo(slide, Inches(0.75), Inches(6.86), Inches(1.32))
    if h is None:
        tf = textbox(slide, Inches(0.75), Inches(6.92), Inches(7.0), Inches(0.35))
        line(tf, "日本大学理工学部 応用情報工学科", SANS, 10.5,
             WHITE if dark else MUTED, first=True)
    tf2 = textbox(slide, Inches(11.8), Inches(6.95), Inches(0.8), Inches(0.35), align=PP_ALIGN.RIGHT)
    line(tf2, str(n), SANS, 10.5, WHITE if dark else MUTED, first=True)


def head(slide, eyebrow, title, sub=None, n=0):
    """白地の標準スライド見出し"""
    rect(slide, 0, 0, W, H, WHITE)
    tf = textbox(slide, Inches(0.75), Inches(0.52), Inches(8.0), Inches(0.5))
    line(tf, eyebrow, SERIF, 20, PURPLE, bold=True, spacing=3.2, first=True)
    tf2 = textbox(slide, Inches(0.75), Inches(1.05), Inches(11.8), Inches(1.1))
    line(tf2, title, SERIF, 34, INK, bold=True, line_spacing=1.25, first=True)
    y = Inches(2.05)
    rect(slide, Inches(0.75), y, Inches(1.1), Pt(3), PURPLE)
    if sub:
        tf3 = textbox(slide, Inches(0.75), Inches(2.28), Inches(11.8), Inches(0.6))
        line(tf3, sub, SANS, 15, MUTED, line_spacing=1.5, first=True)
    footer(slide, n)
    return slide


def statement(slide, eyebrow, big, sub=None, n=0):
    """紫地の主張スライド"""
    gradient_bg(slide)
    tf = textbox(slide, Inches(1.1), Inches(2.15), Inches(11.2), Inches(0.5))
    line(tf, eyebrow, SERIF, 18, WHITE, bold=True, spacing=3.2, first=True)
    tf2 = textbox(slide, Inches(1.1), Inches(2.75), Inches(11.2), Inches(2.2))
    line(tf2, big, SERIF, 46, WHITE, bold=True, line_spacing=1.3, first=True)
    if sub:
        tf3 = textbox(slide, Inches(1.1), Inches(5.1), Inches(10.5), Inches(1.0))
        line(tf3, sub, SANS, 16, WHITE, line_spacing=1.6, first=True)
    footer(slide, n, dark=True)
    return slide


def picture_fit(slide, path, x, y, w, h):
    from PIL import Image as PILImage
    iw, ih = PILImage.open(path).size
    scale = min(w / iw, h / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    slide.shapes.add_picture(path, int(x + (w - nw) / 2), int(y + (h - nh) / 2), nw, nh)


def img(name):
    return os.path.join(IMG, name)


N = [0]
def new():
    N[0] += 1
    return prs.slides.add_slide(BLANK), N[0]

# ---------------------------------------------------------------- 1 タイトル
s, n = new()
gradient_bg(s)
logo(s, Inches(0.85), Inches(0.75), Inches(2.75))
rect(s, Inches(3.6), Inches(2.15), Inches(6.1), Pt(1.5), WHITE)
tf = textbox(s, Inches(1.0), Inches(2.35), Inches(11.3), Inches(0.6), align=PP_ALIGN.CENTER)
line(tf, "C r e a t i n g   A   N e w   W o r l d", SANS, 15, WHITE, bold=True, spacing=4, first=True)
tf = textbox(s, Inches(1.0), Inches(3.02), Inches(11.3), Inches(2.0), align=PP_ALIGN.CENTER)
line(tf, "AIと20分で、", SERIF, 50, WHITE, bold=True, line_spacing=1.2, first=True)
line(tf, "日習のホームページを作る", SERIF, 50, WHITE, bold=True, line_spacing=1.2)
rect(s, Inches(3.6), Inches(5.42), Inches(6.1), Pt(1.5), WHITE)
tf = textbox(s, Inches(1.0), Inches(5.72), Inches(11.3), Inches(1.0), align=PP_ALIGN.CENTER)
line(tf, "日本大学理工学部 応用情報工学科　教授　松野 裕", SANS, 17, WHITE, first=True)
line(tf, "2026年9月8日　日本大学習志野高等学校 1学年 学部見学会", SANS, 13, WHITE, space_before=8)

# ---------------------------------------------------------------- 2 自己紹介
s, n = new()
head(s, "Profile", "松野 裕（まつの ゆたか）", n=n)
tf = textbox(s, Inches(0.75), Inches(2.55), Inches(6.4), Inches(3.4))
for t in ["プログラミング言語", "ソフトウェア工学", "システムの総合信頼性（Dependability）"]:
    line(tf, "・" + t, SANS, 19, INK, line_spacing=1.9, space_before=6, first=(t.startswith("プロ")))
line(tf, "ソフトウェアを、どうやって安心して使えるものにするか。", SANS, 15, MUTED,
     line_spacing=1.7, space_before=22)
line(tf, "それを研究しています。", SANS, 15, MUTED, line_spacing=1.7)
if os.path.exists(img("image2.jpeg")):
    picture_fit(s, img("image2.jpeg"), Inches(7.6), Inches(2.4), Inches(4.9), Inches(3.9))

# ---------------------------------------------------------------- 3 キャンパス
s, n = new()
head(s, "Campus", "みなさんの学校と、同じキャンパスの中にあります。",
     "船橋日大前駅から歩いて5分。日大習志野高校の校舎も、この地図の中にあります。", n=n)
logo(s, Inches(10.65), Inches(0.6), Inches(1.9), "logo_cst_faculty.png", plate=False)
picture_fit(s, img("campus_annotated.png"), Inches(0.75), Inches(2.7), Inches(11.8), Inches(4.15))

# ---------------------------------------------------------------- 4 学科紹介
s, n = new()
head(s, "About Us", "AIとIoTを組み合わせたソフトウェアものづくりを学ぶ。",
     "応用情報工学科では、3つの分野を学びます。", n=n)
fields = [("情報処理", "データを分析して、価値のある情報をつくる。AIもこの分野。", "field1w.jpg"),
          ("ネットワークシステム", "モノやサービスをつなぎ、情報を安全・確実に届ける。", "field2w.jpg"),
          ("組込みシステム", "家電や機械の中で動くソフトウェアをつくる。", "field3w.jpg")]
cw, cgap = Inches(3.74), Inches(0.3)
for i, (t, d, f) in enumerate(fields):
    x = Inches(0.75) + i * (cw + cgap)
    rect(s, x, Inches(2.8), cw, Inches(3.8), PAPER)
    if os.path.exists(img(f)):
        s.shapes.add_picture(img(f), x, Inches(2.8), cw, Inches(2.1))
    rect(s, x, Inches(4.9), Pt(4), Inches(1.7), PURPLE)
    tf = textbox(s, x + Inches(0.28), Inches(5.08), cw - Inches(0.5), Inches(0.5))
    line(tf, t, SERIF, 21, INK, bold=True, first=True)
    tf = textbox(s, x + Inches(0.28), Inches(5.62), cw - Inches(0.5), Inches(1.05))
    line(tf, d, SANS, 13, MUTED, line_spacing=1.55, first=True)

# ---------------------------------------------------------------- 5 日習の先輩
s, n = new()
head(s, "Students' Work", "日習の先輩が、この学科で一緒に作っています。",
     "CSTコースの皆さんの作品。高校にいながら、理工学部の授業を受けられます。（クリックで再生・30秒）", n=n)
_video = img("nichinara_work.mp4")
if os.path.exists(_video):
    s.shapes.add_movie(_video, Inches(3.37), Inches(2.86), Inches(6.6), Inches(3.29),
                       poster_frame_image=img("image29.png"), mime_type="video/mp4")
else:
    picture_fit(s, img("image29.png"), Inches(3.37), Inches(2.86), Inches(6.6), Inches(3.29))
tf = textbox(s, Inches(0.75), Inches(6.32), Inches(11.8), Inches(0.5))
line(tf, "6年前の作品です。当時はUnityの使い方を覚えるところから始めて、半年かかりました。",
     SANS, 16, PURPLE, bold=True, first=True)

# ---------------------------------------------------------------- 6 今日やること
s, n = new()
head(s, "Today", "20分で、日習のホームページを作ります。", n=n)
steps = [("01", "見せる", "AIが昨日つくったサイトを見る"),
         ("02", "聞く", "みなさんに、日習のいいところを聞く"),
         ("03", "書き換える", "聞いたことを、その場でAIに反映させる"),
         ("04", "公開する", "本物のURLで公開して、QRで配る")]
x0, wcard, gap = Inches(0.75), Inches(2.85), Inches(0.25)
for i, (num, t, d) in enumerate(steps):
    x = x0 + i * (wcard + gap)
    rect(s, x, Inches(2.75), wcard, Inches(3.2), PAPER)
    rect(s, x, Inches(2.75), wcard, Pt(4), PURPLE)
    tf = textbox(s, x + Inches(0.3), Inches(3.1), wcard - Inches(0.6), Inches(0.6))
    line(tf, num, SERIF, 30, PURPLE, bold=True, spacing=2, first=True)
    tf = textbox(s, x + Inches(0.3), Inches(3.95), wcard - Inches(0.6), Inches(0.6))
    line(tf, t, SERIF, 23, INK, bold=True, first=True)
    tf = textbox(s, x + Inches(0.3), Inches(4.65), wcard - Inches(0.6), Inches(1.2))
    line(tf, d, SANS, 14, MUTED, line_spacing=1.65, first=True)

# ---------------------------------------------------------------- 7 聞きます
s, n = new()
statement(s, "Your Turn", "みなさんに聞きます。", n=n)
tf = textbox(s, Inches(1.1), Inches(4.65), Inches(11.0), Inches(1.9))
qs = ["日習のいいところは？", "売店で一番買うものは？", "サイトの色は何色にする？", "ゲームをどうしたい？"]
for i, q in enumerate(qs):
    line(tf, "　" + q, SANS, 19, WHITE, line_spacing=1.55, first=(i == 0))

# ---------------------------------------------------------------- 8 AIは何をしている
s, n = new()
head(s, "Behind the Scenes", "いま、AIは何をしているのか。", n=n)
flow = [("みなさんの言葉", "「人工芝がいい」\n「売店のパンがうまい」"),
        ("AIがデータを書き換える", "文章・色・ゲームの設定を\nまとめて直す"),
        ("サイトが変わる", "読み込み直すと\n見た目が変わる")]
x0, wcard, gap = Inches(0.85), Inches(3.45), Inches(0.8)
for i, (t, d) in enumerate(flow):
    x = x0 + i * (wcard + gap)
    rect(s, x, Inches(3.0), wcard, Inches(2.5), PAPER)
    rect(s, x, Inches(3.0), Pt(4), Inches(2.5), PURPLE)
    tf = textbox(s, x + Inches(0.35), Inches(3.45), wcard - Inches(0.7), Inches(0.7))
    line(tf, t, SERIF, 21, INK, bold=True, line_spacing=1.25, first=True)
    tf = textbox(s, x + Inches(0.35), Inches(4.35), wcard - Inches(0.7), Inches(1.0))
    for j, ln in enumerate(d.split("\n")):
        line(tf, ln, SANS, 14, MUTED, line_spacing=1.55, first=(j == 0))
    if i < 2:
        tf = textbox(s, x + wcard, Inches(4.05), gap, Inches(0.6), align=PP_ALIGN.CENTER)
        line(tf, "▶", SANS, 20, PURPLE, first=True)

# ---------------------------------------------------------------- 9 頼み方
s, n = new()
head(s, "How to Ask", "AIには、こう頼みます。",
     "これは例です。今日みなさんから聞いた言葉で、この中身が決まります。", n=n)
rect(s, Inches(0.75), Inches(2.85), Inches(7.3), Inches(3.6), RGBColor(0x2B, 0x25, 0x33))
prompt = [
    "日大習志野高校の1年生に聞いた内容を、",
    "サイトに反映してください。",
    "",
    "・魅力の3つを「人工芝」「売店」「図書室」にする",
    "・生徒の声を、次の3つの言葉に差し替える",
    "・テーマの色を青系にする",
    "・ゲームの敵の名前を「小テスト」「宿題」にする",
    "・ゲームにジャンプ台をもう1つ足す",
]
tf = textbox(s, Inches(1.05), Inches(3.18), Inches(6.8), Inches(3.1))
for i, ln in enumerate(prompt):
    line(tf, ln if ln else "\u3000", SANS, 14, RGBColor(0xE8, 0xE3, 0xEE), line_spacing=1.55, first=(i == 0), raw=True)
tips = [("聞いた言葉を、そのまま渡す", "「いい感じにして」では伝わらない"),
        ("どこを変えるか、名指しする", "変えてほしい場所をはっきり言う"),
        ("出てきたものを見て、言い直す", "一度で決まらない。それがふつう")]
tf = textbox(s, Inches(8.5), Inches(3.1), Inches(4.1), Inches(3.3))
for i, (t, d) in enumerate(tips):
    line(tf, t, SANS, 17, PURPLE, bold=True, space_before=(0 if i == 0 else 26), first=(i == 0))
    line(tf, d, SANS, 13, MUTED, line_spacing=1.5, space_before=4)

# ---------------------------------------------------------------- 10 読めれば直せる
s, n = new()
statement(s, "Why It Matters", "AIと対話できる人が、必要になる。",
          "うまく頼む。出てきたものを確かめる。ちがえば、ちがうと言って直させる。この往復ができる人です。", n=n)

# ---------------------------------------------------------------- 11 対話の記録
s, n = new()
head(s, "Dialogue", "このミニ講義も、AIとの対話で作りました。",
     "きのうの1時間40分。作業の記録（Gitの履歴）から、そのままの時刻です。", n=n)
log = [("12:36", "「20分ずつ、2回。リポジトリを分けて作って」", "日習のサイトの下地ができた"),
       ("13:00", "「いかにもAIが作ったサイト。作り直して」", "デザインを全部組み直した"),
       ("13:32", "「ゲームが単調。もっと本格的に」", "3ステージのアクションゲームになった"),
       ("13:45", "「公開したら、ゲームが動かない」", "バグを見つけて直した"),
       ("14:13", "「スライドを作って」", "この18枚ができた"),
       ("いま", "「4枚目の丸が変」「この説明は分からない」", "その指摘で、今このページを直した")]
for i, (t, said, got) in enumerate(log):
    y = Inches(2.76) + i * Inches(0.60)
    rect(s, Inches(0.75), y + Inches(0.06), Pt(3), Inches(0.42), PURPLE)
    tf = textbox(s, Inches(1.02), y, Inches(0.95), Inches(0.48), anchor=MSO_ANCHOR.MIDDLE)
    line(tf, t, MONO, 13, PURPLE, bold=True, first=True)
    tf = textbox(s, Inches(2.1), y, Inches(5.6), Inches(0.48), anchor=MSO_ANCHOR.MIDDLE)
    line(tf, said, SANS, 15, INK, first=True)
    tf = textbox(s, Inches(7.95), y, Inches(0.5), Inches(0.48), anchor=MSO_ANCHOR.MIDDLE)
    line(tf, "▶", SANS, 12, PURPLE, first=True)
    tf = textbox(s, Inches(8.5), y, Inches(4.1), Inches(0.48), anchor=MSO_ANCHOR.MIDDLE)
    line(tf, got, SANS, 14, MUTED, first=True)
tf = textbox(s, Inches(0.75), Inches(6.33), Inches(11.8), Inches(0.4))
line(tf, "うまくいかない、と言い続けたのは人間です。AIは言われるまで気づきませんでした。",
     SANS, 16, PURPLE, bold=True, first=True)

# ---------------------------------------------------------------- 12 3年後7年後
s, n = new()
head(s, "Your Future", "3年後、みなさんは大学生。7年後、働いています。", n=n)
rect(s, Inches(1.4), Inches(3.9), Inches(10.5), Pt(3), LINE)
marks = [("2026", "今日", "高校1年生", Inches(1.4), 22),
         ("2029", "3年後", "大学に入る", Inches(5.15), 22),
         ("2033", "7年後", "就職、または大学院", Inches(8.9), 17)]
for year, when, what, x, wsize in marks:
    rect(s, x + Inches(0.55), Inches(3.72), Inches(0.22), Inches(0.22), PURPLE, MSO_SHAPE.OVAL)
    tf = textbox(s, x, Inches(2.95), Inches(2.6), Inches(0.7), align=PP_ALIGN.CENTER)
    line(tf, year, SERIF, 34, PURPLE, bold=True, spacing=1, first=True)
    tf = textbox(s, x, Inches(4.25), Inches(2.6), Inches(1.1), align=PP_ALIGN.CENTER)
    line(tf, when, SANS, 15, MUTED, first=True)
    line(tf, what, SERIF, wsize, INK, bold=True, space_before=6)
tf = textbox(s, Inches(0.75), Inches(5.85), Inches(11.8), Inches(0.8))
line(tf, "そのころAIが何をできるようになっているか、私にも分かりません。", SANS, 18, INK, first=True)

# ---------------------------------------------------------------- 13 AIの速さ
s, n = new()
head(s, "How Fast", "半年かかったことが、いまは数十分です。", n=n)
cols = [("6年前", "先輩たちの作品", "Unityの使い方を覚えるところから始めて、半年", PAPER, INK, MUTED),
        ("2022年11月", "ChatGPTが公開", "そのころは、文章を書くのが中心だった", PAPER, INK, MUTED),
        ("2026年9月", "今日、この20分", "話を聞いて、サイトを作って、公開できる", PURPLE, WHITE, WHITE)]
cw2, gap2 = Inches(3.83), Inches(0.32)
for i, (d1, d2, d3, bg, fg, sub) in enumerate(cols):
    x = Inches(0.75) + i * (cw2 + gap2)
    rect(s, x, Inches(2.9), cw2, Inches(2.75), bg)
    tf = textbox(s, x + Inches(0.35), Inches(3.18), cw2 - Inches(0.7), Inches(0.45))
    line(tf, d1, SANS, 14, (WHITE if i == 2 else PURPLE), bold=True, first=True)
    tf = textbox(s, x + Inches(0.35), Inches(3.68), cw2 - Inches(0.7), Inches(0.9))
    line(tf, d2, SERIF, 22, fg, bold=True, line_spacing=1.25, first=True)
    tf = textbox(s, x + Inches(0.35), Inches(4.62), cw2 - Inches(0.7), Inches(0.9))
    line(tf, d3, SANS, 13.5, sub, line_spacing=1.6, first=True)
tf = textbox(s, Inches(0.75), Inches(5.95), Inches(11.8), Inches(0.9))
line(tf, "同じくらいのものなら、いまはAIと話しながら数十分でできてしまいます。", SANS, 18, INK, first=True)
line(tf, "次の3年で何が起きるかは、誰にも分かりません。だから、いまのAIを自分で触ってみることです。",
     SANS, 18, INK, space_before=6)

# ---------------------------------------------------------------- 14 AIと人間
s, n = new()
head(s, "AI and You", "今日、AIがやったこと。人間がやったこと。", n=n)
left = ["文章を書いた", "色を決めた", "コードを書いた", "ゲームのステージを作った"]
right = ["何を作るか決めた", "みなさんに聞いた", "本当かどうか確かめた", "ちがうと言って直させた"]
for i, (ttl, items, bg, fg, sub) in enumerate([
        ("AI", left, PAPER, INK, MUTED), ("人間", right, PURPLE, WHITE, WHITE)]):
    x = Inches(0.75) + i * Inches(6.15)
    rect(s, x, Inches(2.85), Inches(5.65), Inches(3.45), bg)
    tf = textbox(s, x + Inches(0.45), Inches(3.15), Inches(4.9), Inches(0.6))
    line(tf, ttl, SERIF, 27, (PURPLE if i == 0 else WHITE), bold=True, spacing=2, first=True)
    tf = textbox(s, x + Inches(0.45), Inches(3.9), Inches(4.9), Inches(2.3))
    for j, it in enumerate(items):
        line(tf, "・" + it, SANS, 16, fg, line_spacing=1.78, first=(j == 0))
tf = textbox(s, Inches(0.75), Inches(6.34), Inches(11.8), Inches(0.5))
line(tf, "AIは日習のことを何も知りませんでした。知っているのは、みなさんだけです。", SANS, 17, PURPLE, bold=True, first=True)

# ---------------------------------------------------------------- 15 AIも間違える
s, n = new()
head(s, "Check", "AIも間違えます。確かめるのは人間です。",
     "AIが作ったジャンプ台。押した長さでジャンプを低くする処理が、ジャンプ台の勢いまで消していました。", n=n)
if os.path.exists(img("bug_before_after.png")):
    picture_fit(s, img("bug_before_after.png"), Inches(0.75), Inches(2.9), Inches(11.8), Inches(3.4))
tf = textbox(s, Inches(0.75), Inches(6.34), Inches(11.8), Inches(0.5))
line(tf, "公開してから見つかりました。確かめる仕組みを作れる人が要ります。それを学ぶのが情報系の学科です。",
     SANS, 16, PURPLE, bold=True, first=True)

# ---------------------------------------------------------------- 16 まとめ
s, n = new()
gradient_bg(s)
tf = textbox(s, Inches(1.1), Inches(1.05), Inches(11.2), Inches(0.5))
line(tf, "Summary", SERIF, 18, WHITE, bold=True, spacing=3.2, first=True)
tf = textbox(s, Inches(1.1), Inches(1.6), Inches(11.2), Inches(0.9))
line(tf, "今日、持って帰ってほしいこと。", SERIF, 38, WHITE, bold=True, first=True)
pts = [("01", "いまのAIを、自分で触ってみる", "どこまでできて、どこができないかは、触らないと分からない"),
       ("02", "何を作るか決めるのは、人間", "AIは日習を知らない。決めて、聞いて、確かめるのはみなさん"),
       ("03", "AIと対話できる人になる", "うまく頼み、確かめ、直させる。その中身を学ぶのが応用情報工学科です")]
for i, (num, t, d) in enumerate(pts):
    y = Inches(2.85) + i * Inches(1.28)
    tf = textbox(s, Inches(1.1), y, Inches(1.0), Inches(0.6))
    line(tf, num, SERIF, 26, WHITE, bold=True, spacing=2, first=True)
    tf = textbox(s, Inches(2.2), y - Inches(0.05), Inches(10.0), Inches(0.55))
    line(tf, t, SERIF, 26, WHITE, bold=True, first=True)
    tf = textbox(s, Inches(2.2), y + Inches(0.52), Inches(10.0), Inches(0.5))
    line(tf, d, SANS, 14, WHITE, first=True)
footer(s, n, dark=True)

# ---------------------------------------------------------------- 17 QR（この回のぶんだけ）
label = f"{SESSION}回目のみなさんへ"
qr = f"narashino-visit-{SESSION}-qr.png"
url = f"https://yutakajssst.github.io/narashino-visit-{SESSION}/"
s, n = new()
head(s, "Your Site", "今日つくったサイトは、ここにあります。",
     label + "　放課後でも、家でも開けます。", n=n)
if os.path.exists(img(qr)):
    picture_fit(s, img(qr), Inches(1.35), Inches(2.85), Inches(3.3), Inches(3.3))
tf = textbox(s, Inches(5.25), Inches(3.55), Inches(7.4), Inches(1.4))
line(tf, url, MONO, 16, PURPLE, bold=True, line_spacing=1.4, first=True)
line(tf, "スマホのカメラでQRコードを読んでください。", SANS, 15, MUTED, space_before=16)
line(tf, "みなさんの言葉が入ったページと、ミニゲームがあります。", SANS, 15, MUTED, space_before=4)

prs.save(OUT)
print("saved", OUT, "slides:", len(prs.slides.__iter__.__self__._sldIdLst))
