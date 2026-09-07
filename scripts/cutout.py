"""
Cutouts.

Removes the background from the two portraits so the figure can interlock with
type instead of sitting inside a rectangle, and grades what is left with a
crimson rim from the upper right and a cool fill from the lower left.

This is real matting, not a mask over a photo. Run once; the outputs are
committed.

    python scripts/cutout.py
"""

from __future__ import annotations

import os

from PIL import Image, ImageEnhance, ImageFilter
from rembg import new_session, remove

SRC = r"D:\Resumes\Professional photo refernces\New folder (2)"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "cut")
os.makedirs(OUT, exist_ok=True)

B = "WhatsApp Image 2026-09-07 at "
SESSION = new_session("u2net_human_seg")


def light(im: Image.Image) -> Image.Image:
    """
    Cinematic grade on the subject only.

    A rim light lives on the silhouette EDGE. An earlier version blended a
    colour across a broad directional gradient, which put crimson straight over
    the face and made the skin look sunburnt. This derives the rim from the
    alpha channel instead: dilate the matte, subtract it from itself, and you
    have a band that hugs the outline. Then restrict that band to the upper
    right so it reads as one light rather than a glow.

    Skin is left alone.
    """
    rgb = im.convert("RGBA")
    alpha = rgb.getchannel("A")
    body = rgb.convert("RGB")
    w, h = body.size

    # Gentle. A cutout needs a little more contrast than a framed photo, but
    # this is a face on a resume, not a film poster.
    body = ImageEnhance.Brightness(body).enhance(0.96)
    body = ImageEnhance.Contrast(body).enhance(1.10)
    body = ImageEnhance.Color(body).enhance(0.92)

    # --- the edge band -----------------------------------------------------
    # Erode the matte, then subtract the eroded version from the original. What
    # is left is a ring hugging the inside of the silhouette, which is exactly
    # where a rim light lands.
    solid = alpha.point(lambda v: 255 if v > 160 else 0)
    inner = solid.filter(ImageFilter.MinFilter(9))

    ring = Image.new("L", (w, h))
    ring.putdata([max(0, s - i) for s, i in zip(solid.getdata(), inner.getdata())])
    ring = ring.filter(ImageFilter.GaussianBlur(max(1.5, w * 0.006)))

    # Restrict the ring to the upper right, so it is a light with a direction.
    side = Image.linear_gradient("L").rotate(215, expand=False).resize((w, h))
    side = side.point(lambda v: max(0, v - 90) * 2)
    rim_mask = Image.new("L", (w, h))
    rim_mask.putdata([(r * s) // 255 for r, s in zip(ring.getdata(), side.getdata())])

    rim = Image.new("RGB", (w, h), (255, 90, 96))
    body = Image.composite(Image.blend(body, rim, 0.72), body, rim_mask)

    # A cool fill along the lower-left outline, same technique, weaker.
    side2 = Image.linear_gradient("L").rotate(35, expand=False).resize((w, h))
    side2 = side2.point(lambda v: max(0, v - 130) * 2)
    fill_mask = Image.new("L", (w, h))
    fill_mask.putdata([(r * s) // 255 for r, s in zip(ring.getdata(), side2.getdata())])
    fill = Image.new("RGB", (w, h), (120, 200, 235))
    body = Image.composite(Image.blend(body, fill, 0.5), body, fill_mask)

    body = body.filter(ImageFilter.UnsharpMask(radius=1.5, percent=90, threshold=3))

    out = body.convert("RGBA")
    out.putalpha(alpha)
    return out


def trim(im: Image.Image, pad: int = 8) -> Image.Image:
    """Crop to the subject, so the PNG is not mostly empty pixels."""
    box = im.getchannel("A").getbbox()
    if not box:
        return im
    l, t, r, b = box
    return im.crop((max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, b + pad)))


def cut(src: str, name: str, width: int = 1100) -> None:
    path = os.path.join(SRC, src)
    if not os.path.exists(path):
        print(f"  MISSING  {src}")
        return

    im = Image.open(path).convert("RGBA")
    matted = remove(im, session=SESSION, post_process_mask=True)
    matted = trim(matted)
    matted = light(matted)

    if matted.width > width:
        matted = matted.resize((width, round(matted.height * width / matted.width)), Image.LANCZOS)

    dst = os.path.join(OUT, name)
    matted.save(dst, "WEBP", quality=90, method=6, lossless=False)
    print(f"  {name:22} {matted.size[0]}x{matted.size[1]:<5} {os.path.getsize(dst)/1024:6.1f} KB")


if __name__ == "__main__":
    print("\n  cutouts\n")
    cut(f"{B}6.39.03 PM.jpeg", "aditya.webp")          # standing, grey blazer
    cut(f"{B}6.39.03 PM (3).jpeg", "aditya-seat.webp")  # seated, warm interior
    print()
