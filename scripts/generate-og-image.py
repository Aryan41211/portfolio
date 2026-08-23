"""Render public/og-image.png — 1200x630 social card matching the hero field."""
import math, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
SS = 2  # supersample factor for smooth points/lines


def oklch_to_srgb(L, C, h_deg):
    h = math.radians(h_deg)
    a, b = C * math.cos(h), C * math.sin(h)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

    def enc(u):
        u = max(0.0, min(1.0, u))
        u = 1.055 * (u ** (1 / 2.4)) - 0.055 if u > 0.0031308 else 12.92 * u
        return int(round(max(0.0, min(1.0, u)) * 255))

    return enc(r), enc(g), enc(bb)


BRAND = oklch_to_srgb(0.72, 0.17, 264)          # dark-mode --brand
BG_TOP = oklch_to_srgb(0.13, 0, 0)              # dark --background
BG_BOT = (26, 26, 30)
FG = oklch_to_srgb(0.96, 0, 0)
MUTED = oklch_to_srgb(0.70, 0, 0)


def rand_factory(seed):
    s = seed & 0xFFFFFFFF
    def r():
        nonlocal s
        s = (s * 1664525 + 1013904223) & 0xFFFFFFFF
        return s / 4294967296
    return r


def gaussian(rand):
    u = max(rand(), 1e-6)
    return math.sqrt(-2 * math.log(u)) * math.cos(2 * math.pi * rand())


def lerp(a, b, t):
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


img = Image.new("RGB", (W * SS, H * SS), BG_TOP)
d = ImageDraw.Draw(img, "RGBA")

# Vertical gradient ground
for y in range(H * SS):
    d.line([(0, y), (W * SS, y)], fill=lerp(BG_TOP, BG_BOT, y / (H * SS)))

# Accent bloom on the right, same placement as the hero glow.
# Composited in float: stacking dozens of low-alpha ellipses through Pillow's
# 8-bit blend truncates the red channel to zero long before blue, which turns
# an indigo glow teal at the edges.
cx, cy, rad = int(W * 0.78) * SS, int(H * 0.42) * SS, int(340 * SS)
base = np.asarray(img, dtype=np.float32)
yy, xx = np.mgrid[0 : H * SS, 0 : W * SS]
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / rad
alpha = (np.clip(1.0 - dist, 0.0, 1.0) ** 2.4 * 0.62)[..., None]
img = Image.fromarray(
    np.clip(base * (1 - alpha) + np.float32(BRAND) * alpha, 0, 255).astype(np.uint8), "RGB"
)
d = ImageDraw.Draw(img, "RGBA")

# Clustered embedding field, weighted to the right half
rand = rand_factory(20260823)
centroids = [
    (W * (0.52 + rand() * 0.46) * SS, H * (0.12 + rand() * 0.76) * SS) for _ in range(7)
]
pts = []
for i in range(340):
    ccx, ccy = centroids[i % 7]
    depth = rand()
    x = ccx + gaussian(rand) * 82 * SS
    y = ccy + gaussian(rand) * 82 * SS
    if x < W * 0.42 * SS:
        continue
    pts.append((x, y, 1.4 + depth * 3.4, rand() < 0.24, 0.25 + depth * 0.6))

# One resolved kNN query, drawn behind the dots
anchor = pts[len(pts) // 2]
near = sorted(pts, key=lambda p: (p[0] - anchor[0]) ** 2 + (p[1] - anchor[1]) ** 2)[1:8]
for n in near:
    d.line([(anchor[0], anchor[1]), (n[0], n[1])], fill=(*BRAND, 120), width=max(1, SS))

for x, y, r, accent, op in pts:
    r *= SS
    color = BRAND if accent else MUTED
    d.ellipse([x - r, y - r, x + r, y + r], fill=(*color, int(op * 255)))

ar = 6 * SS
d.ellipse([anchor[0] - ar, anchor[1] - ar, anchor[0] + ar, anchor[1] + ar], fill=(*BRAND, 255))

img = img.resize((W, H), Image.LANCZOS)
d = ImageDraw.Draw(img, "RGBA")


def load(names, size):
    for n in names:
        p = os.path.join("C:\\Windows\\Fonts", n)
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                pass
    return ImageFont.load_default()


bold = load(["Inter-Bold.ttf", "segoeuib.ttf", "arialbd.ttf"], 92)
semi = load(["Inter-SemiBold.ttf", "segoeuisb.ttf", "seguisb.ttf", "arialbd.ttf"], 27)
reg = load(["Inter-Regular.ttf", "segoeui.ttf", "arial.ttf"], 26)

X = 80
# Eyebrow with accent rule
d.rectangle([X, 168, X + 46, 171], fill=BRAND)
d.text((X + 62, 156), "PORTFOLIO", font=semi, fill=BRAND)

d.text((X, 246), "Aryan Nitin", font=bold, fill=FG)
d.text((X, 348), "Kondekar", font=bold, fill=FG)
kw = d.textlength("Kondekar", font=bold)
d.text((X + kw, 348), ".", font=bold, fill=BRAND)

d.text((X, 486), "Machine Learning Engineer  ·  NLP  ·  MLOps", font=reg, fill=MUTED)
d.text((X, 526), "aryankondekar.dev", font=reg, fill=MUTED)

out = os.path.join(os.getcwd(), "public", "og-image.png")
img.save(out, "PNG", optimize=True)
print("wrote", out, os.path.getsize(out), "bytes")
