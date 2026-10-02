"""
Tạo bản WebP đã thu nhỏ cho các ảnh nặng hiển thị trên trang công khai.

Chạy lại mỗi khi thêm template mới (screen.png) hoặc đổi logo/hero:

    python scripts/optimize-images.py

Cần Pillow (`pip install pillow`). Chỉ ghi lại file .webp khi ảnh gốc mới hơn,
nên chạy nhiều lần không tốn thời gian.

Lý do: screenshot full-page của template (screen.png) nặng tới 4 MB/ảnh, tổng
~40 MB — carousel trang chủ + card Marketplace chỉ hiển thị rộng 240–300px.
Bản WebP rộng tối đa 600px (đủ nét cho màn 2x) nhẹ hơn ~10–20 lần. File gốc
.png/.jpg giữ nguyên làm nguồn; utils/templateScreens.ts ưu tiên .webp, thiếu
thì fallback .png.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

SCREEN_MAX_WIDTH = 600
SCREEN_QUALITY = 78


def is_fresh(src: Path, dst: Path) -> bool:
    return dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime


def save_webp(im: Image.Image, dst: Path, quality: int) -> None:
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    im.save(dst, "WEBP", quality=quality, method=6)


def resize_to_width(im: Image.Image, width: int) -> Image.Image:
    if im.width <= width:
        return im
    height = round(im.height * width / im.width)
    return im.resize((width, height), Image.LANCZOS)


def resize_to_height(im: Image.Image, height: int) -> Image.Image:
    if im.height <= height:
        return im
    width = round(im.width * height / im.height)
    return im.resize((width, height), Image.LANCZOS)


def report(src: Path, dst: Path) -> None:
    before = src.stat().st_size // 1024
    after = dst.stat().st_size // 1024
    print(f"  {dst.relative_to(ROOT)}  {before} KB -> {after} KB")


def optimize_template_screens() -> None:
    print("Template screenshots:")
    for src in sorted(ROOT.glob("src/data/Template/*/*/screen.png")):
        dst = src.with_suffix(".webp")
        if is_fresh(src, dst):
            continue
        with Image.open(src) as im:
            # Screenshot không cần kênh alpha — nền trang luôn đặc.
            save_webp(resize_to_width(im.convert("RGB"), SCREEN_MAX_WIDTH), dst, SCREEN_QUALITY)
        report(src, dst)


# (nguồn, đích, hàm resize, chất lượng)
PUBLIC_ASSETS = [
    # Hero trang chủ: 2 cỡ cho srcset (mobile ~360–700px, desktop ~650px x2).
    ("hero-banner-visual.jpg", "hero-banner-visual.webp", lambda im: im, 80),
    ("hero-banner-visual.jpg", "hero-banner-visual-700.webp", lambda im: resize_to_width(im, 700), 80),
    # Logo hiển thị cao tối đa ~45px (icon 1.5em) / ~24px (chữ 0.78em) — lưu 3x.
    ("logo-icon.png", "logo-icon.webp", lambda im: resize_to_height(im, 144), 90),
    ("logo-wordmark.png", "logo-wordmark.webp", lambda im: resize_to_height(im, 96), 90),
]


def optimize_public_assets() -> None:
    print("Public assets:")
    for src_name, dst_name, resize, quality in PUBLIC_ASSETS:
        src = ROOT / "public" / src_name
        dst = ROOT / "public" / dst_name
        if is_fresh(src, dst):
            continue
        with Image.open(src) as im:
            save_webp(resize(im), dst, quality)
        report(src, dst)


if __name__ == "__main__":
    optimize_template_screens()
    optimize_public_assets()
