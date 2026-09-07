"""
Photo pipeline.

Takes the reference shots and produces a consistent, graded set for the site.
Everything here is real photographic processing — crop, levels, colour grade,
local contrast, sharpen, resize, WebP. Nothing is generated or hallucinated;
the person in the output is the person in the input.

Run:  python scripts/make-plates.py
Out:  public/plates/
"""

from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import os

SRC = r"D:\Resumes\Professional photo refernces\New folder (2)"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "plates")
os.makedirs(OUT, exist_ok=True)

B = "WhatsApp Image 2026-09-07 at "


def grade(im, *, warmth=1.0, lift=0, contrast=1.06, sat=1.02, clarity=0.55, gamma=1.0):
    """
    A restrained editorial grade. The goal is that these look like they came
    from one shoot, not that they look like a filter was applied.
    """
    im = im.convert("RGB")

    # Gentle gamma before anything else — opens shadows without crushing highs.
    if gamma != 1.0:
        lut = [min(255, int(((i / 255) ** (1 / gamma)) * 255)) for i in range(256)]
        im = im.point(lut * 3)

    # Lift the black point slightly. Film does this; phone HDR does not.
    if lift:
        lut = [min(255, int(lift + i * (255 - lift) / 255)) for i in range(256)]
        im = im.point(lut * 3)

    # Warmth: scale R up and B down about a neutral pivot.
    if warmth != 1.0:
        r, g, b = im.split()
        r = r.point(lambda v: min(255, int(v * warmth)))
        b = b.point(lambda v: min(255, int(v * (2 - warmth))))
        im = Image.merge("RGB", (r, g, b))

    im = ImageEnhance.Contrast(im).enhance(contrast)
    im = ImageEnhance.Color(im).enhance(sat)

    # Local contrast via unsharp at a large radius — adds presence, not edges.
    if clarity:
        im = im.filter(ImageFilter.UnsharpMask(radius=18, percent=int(clarity * 100), threshold=3))

    # Real sharpening, small radius, last.
    im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=95, threshold=3))
    return im


def crop_box(im, box):
    return im.crop(box)


def crop_ratio(im, ratio, vanchor=0.35, hanchor=0.5):
    w, h = im.size
    if w / h > ratio:
        nw, nh = int(h * ratio), h
        x, y = int((w - nw) * hanchor), 0
    else:
        nw, nh = w, int(w / ratio)
        x, y = 0, int((h - nh) * vanchor)
    return im.crop((x, y, x + nw, y + nh))


def plate(src, name, *, ratio=None, box=None, width=1400, vanchor=0.35, hanchor=0.5,
          quality=86, **g):
    path = src if os.path.isabs(src) else os.path.join(SRC, src)
    if not os.path.exists(path):
        print(f"  MISSING  {os.path.basename(path)}")
        return
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)          # phones lie about orientation
    if box:
        im = crop_box(im, box)
    elif ratio:
        im = crop_ratio(im, ratio, vanchor, hanchor)
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im = grade(im, **g)
    p = os.path.join(OUT, name)
    im.save(p, "WEBP", quality=quality, method=6)
    print(f"  {name:26} {im.size[0]}x{im.size[1]:<5} {os.path.getsize(p)/1024:6.1f} KB")


print("\n  plates\n")

# Filenames verified against a numbered contact sheet. Do not guess these again.
PORTRAIT_STAND = f"{B}6.39.03 PM.jpeg"      # grey blazer, column, daylight — best headshot
PORTRAIT_SEAT = f"{B}6.39.03 PM (3).jpeg"   # blazer, seated, warm interior
MOTORCYCLE = f"{B}6.35.14 PM (1).jpeg"      # the ride
TRAIL = f"{B}6.35.13 PM (3).jpeg"           # mountains, casual

# ---- the portrait. Daylight, grey blazer, clean separation from the column.
plate(PORTRAIT_STAND, "portrait.webp",
      ratio=4 / 5, vanchor=0.06, width=1000,
      warmth=1.03, lift=6, contrast=1.05, sat=1.0, clarity=0.5, gamma=1.03)

plate(PORTRAIT_STAND, "portrait-square.webp",
      ratio=1 / 1, vanchor=0.04, width=900,
      warmth=1.03, lift=6, contrast=1.05, sat=1.0, clarity=0.5, gamma=1.03)

# ---- working, dusk rooftop. The screen is the light source; keep it moody.
plate(f"{B}6.39.03 PM (4).jpeg", "working-dusk.webp",
      ratio=3 / 2, vanchor=0.40, width=1600,
      warmth=1.01, lift=10, contrast=1.10, sat=0.96, clarity=0.65, gamma=1.10)

# ---- working, warm interior. Reads as "actually doing the work".
plate(f"{B}6.10.07 PM.jpeg", "working-desk.webp",
      ratio=3 / 2, vanchor=0.30, width=1600,
      warmth=1.04, lift=8, contrast=1.06, sat=1.02, clarity=0.55, gamma=1.05)

plate(f"{B}6.10.08 PM.jpeg", "working-focus.webp",
      ratio=3 / 2, vanchor=0.28, width=1600,
      warmth=1.03, lift=8, contrast=1.06, sat=1.02, clarity=0.55, gamma=1.05)

# ---- the ride. His own words: riding, exploring, capturing moments.
plate(MOTORCYCLE, "ride.webp",
      ratio=3 / 2, vanchor=0.28, width=1500,
      warmth=1.03, lift=6, contrast=1.08, sat=1.05, clarity=0.6)

# ---- travel. Mountains and water. Personal section, not Work.
plate("60403225-53e5-4ee5-ac24-ab40e85b5799.jpg", "travel-lake.webp",
      ratio=16 / 9, vanchor=0.30, width=1500, quality=80,
      warmth=1.02, lift=6, contrast=1.07, sat=1.06, clarity=0.55)

plate(f"{B}6.35.14 PM (2).jpeg", "travel-peak.webp",
      ratio=3 / 2, vanchor=0.25, width=1400, quality=82,
      warmth=1.01, lift=6, contrast=1.08, sat=1.04, clarity=0.6)

plate(TRAIL, "travel-trail.webp",
      ratio=4 / 5, vanchor=0.18, width=1000, quality=82,
      warmth=1.03, lift=6, contrast=1.06, sat=1.05, clarity=0.55)

# ---- campus. Atria sign in frame; earns its place in Education.
plate(f"{B}6.35.12 PM.jpeg", "campus.webp",
      ratio=4 / 5, vanchor=0.10, width=1000, quality=82,
      warmth=1.02, lift=6, contrast=1.06, sat=1.03, clarity=0.55)

# ---- seated portrait, alternate.
plate(PORTRAIT_SEAT, "portrait-seated.webp",
      ratio=4 / 5, vanchor=0.12, width=1000,
      warmth=1.04, lift=8, contrast=1.06, sat=1.02, clarity=0.55, gamma=1.05)

print()
