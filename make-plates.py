"""
Plate pipeline. Source photos -> duotone WebP plates in the site palette.
Run: python make-plates.py
Every output is a deliberate crop; nothing is upscaled beyond source resolution.
"""
from PIL import Image, ImageOps, ImageEnhance
import os

SRC = r"E:\PROJECTS\Portfolio website"
OUT = os.path.join(SRC, "plates-out")
os.makedirs(OUT, exist_ok=True)

PAPER = (232, 227, 217)   # --paper  #E8E3D9
INK   = (22, 21, 15)      # --ink    #16150F

def ramp(a, b, n=256):
    return [tuple(int(a[c] + (b[c]-a[c]) * i/(n-1)) for c in range(3)) for i in range(n)]

LUT = ramp(INK, PAPER)     # shadow -> highlight

def duotone(im, contrast=1.14, black=6, white=249):
    g = ImageOps.grayscale(im)
    g = ImageOps.autocontrast(g, cutoff=(1, 1))
    g = ImageEnhance.Contrast(g).enhance(contrast)
    # levels: pull shadows down, hold highlights off pure paper
    g = g.point(lambda v: max(0, min(255, int((v - black) * 255 / max(1, (white - black))))))
    out = Image.new("RGB", g.size)
    out.putdata([LUT[p] for p in g.getdata()])
    return out

def crop_to(im, ratio, anchor=0.5, vanchor=0.35):
    """Center-crop to aspect `ratio` (w/h). vanchor biases the vertical window (0=top)."""
    w, h = im.size
    if w / h > ratio:
        nw = int(h * ratio); nh = h
        x = int((w - nw) * anchor); y = 0
    else:
        nw = w; nh = int(w / ratio)
        x = 0; y = int((h - nh) * vanchor)
    return im.crop((x, y, x + nw, y + nh))

def plate(src, name, ratio, width, vanchor=0.35, anchor=0.5, contrast=1.14,
          quality=82, box=None, root=SRC):
    """box=(l,t,r,b) takes an explicit crop and skips the ratio heuristic."""
    im = Image.open(os.path.join(root, src)).convert("RGB")
    if box:
        im = im.crop(box)
        ratio = im.width / im.height
    else:
        im = crop_to(im, ratio, anchor, vanchor)
    if im.width > width:
        im = im.resize((width, int(width / ratio)), Image.LANCZOS)
    im = duotone(im, contrast=contrast)
    p = os.path.join(OUT, name)
    im.save(p, "WEBP", quality=quality, method=6)
    print(f"{name:28} {im.size[0]}x{im.size[1]:<5} {os.path.getsize(p)/1024:6.1f} KB")

B = "WhatsApp Image 2026-08-30 at 2.35.11 PM"
PLATES = r"E:\PROJECTS\portfolio-plates"

# Portrait — retone the existing tight square headshot into the palette.
plate("adi.webp", "portrait.webp", 1/1, 580, contrast=1.06, root=PLATES)
# Portrait, wider — daylight column shot cropped to head-and-torso.
plate(f"{B}.jpeg", "portrait-wide.webp", 1/1, 580, box=(400, 250, 1010, 860), contrast=1.10)
# TerraHawk — the proposal on screen. Documentary evidence, not a pose.
# Explicit box: keeps BOTH the figure and the laptop display in frame.
plate(f"{B} (3).jpeg", "plate-terrahawk.webp", 3/2, 1200, box=(0, 380, 960, 1220), contrast=1.18)
# Working plates
plate(f"{B} (2).jpeg", "plate-desk-a.webp",    3/2,  1200, vanchor=0.28, contrast=1.16)
plate(f"{B} (5).jpeg", "plate-desk-b.webp",    3/2,  1200, vanchor=0.34, contrast=1.22)
# Seated portrait, alternate
plate(f"{B} (6).jpeg", "portrait-alt.webp",    4/5,   760, vanchor=0.20, contrast=1.16)
