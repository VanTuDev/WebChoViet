import { useRef, useState, useCallback, useEffect } from 'react';
import { X, Upload, Crop, Check, Loader2 } from 'lucide-react';
import { uploadImage } from '../../../services/uploadService';

interface Props {
  imageKey: string;
  label: string;
  currentUrl?: string;
  onConfirm: (key: string, dataUrl: string) => void;
  onClose: () => void;
}

interface CropBox { x: number; y: number; w: number; h: number; }

export default function ImageCropModal({ imageKey, label, currentUrl, onConfirm, onClose }: Props) {
  const [imgSrc, setImgSrc] = useState<string | null>(currentUrl ?? null);
  const [cropBox, setCropBox] = useState<CropBox>({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
  const [dragging, setDragging] = useState<'move' | 'resize' | null>(null);
  const [dragStart, setDragStart] = useState({ mx: 0, my: 0, cx: 0, cy: 0, cw: 0, ch: 0 });
  const [step, setStep] = useState<'upload' | 'crop'>(currentUrl ? 'crop' : 'upload');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgElRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgElRef.current;
    const container = containerRef.current;
    if (!canvas || !img || !container) return;

    const cw = container.clientWidth;
    const ch = container.clientHeight;
    canvas.width = cw;
    canvas.height = ch;

    const ctx = canvas.getContext('2d')!;
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);

    // dim overlay
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, cw, ch);

    // clear crop region
    const bx = dx + cropBox.x * dw;
    const by = dy + cropBox.y * dh;
    const bw = cropBox.w * dw;
    const bh = cropBox.h * dh;
    ctx.clearRect(bx, by, bw, bh);
    ctx.drawImage(img, dx, dy, dw, dh);

    // crop border
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, bw, bh);

    // resize handle (bottom-right)
    ctx.fillStyle = '#fff';
    ctx.fillRect(bx + bw - 8, by + bh - 8, 12, 12);
  }, [cropBox]);

  useEffect(() => {
    if (step === 'crop' && imgSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgSrc;
      img.onload = () => {
        imgElRef.current = img;
        drawCanvas();
      };
    }
  }, [imgSrc, step]);

  useEffect(() => {
    if (step === 'crop') drawCanvas();
  }, [cropBox, drawCanvas, step]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      setImgSrc(e.target?.result as string);
      setStep('crop');
    };
    reader.readAsDataURL(file);
  };

  const getRelPos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { mx: (e.clientX - rect.left) / rect.width, my: (e.clientY - rect.top) / rect.height };
  };

  const getImageRect = () => {
    const canvas = canvasRef.current!;
    const img = imgElRef.current!;
    const cw = canvas.width; const ch = canvas.height;
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale; const dh = img.naturalHeight * scale;
    const dx = (cw - dw) / 2; const dy = (ch - dh) / 2;
    return { dx: dx / cw, dy: dy / ch, dw: dw / cw, dh: dh / ch };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { mx, my } = getRelPos(e);
    const { dx, dy, dw, dh } = getImageRect();
    const bx = dx + cropBox.x * dw;
    const by = dy + cropBox.y * dh;
    const bw = cropBox.w * dw;
    const bh = cropBox.h * dh;
    const handleX = bx + bw - 0.01; const handleY = by + bh - 0.01;
    if (mx > handleX && my > handleY) {
      setDragging('resize');
    } else if (mx > bx && mx < bx + bw && my > by && my < by + bh) {
      setDragging('move');
    }
    setDragStart({ mx, my, cx: cropBox.x, cy: cropBox.y, cw: cropBox.w, ch: cropBox.h });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const { mx, my } = getRelPos(e);
    const { dw, dh } = getImageRect();
    const dx = mx - dragStart.mx;
    const dy = my - dragStart.my;
    if (dragging === 'move') {
      setCropBox(prev => ({
        ...prev,
        x: Math.max(0, Math.min(1 - prev.w, dragStart.cx + dx / dw)),
        y: Math.max(0, Math.min(1 - prev.h, dragStart.cy + dy / dh)),
      }));
    } else {
      setCropBox(prev => ({
        ...prev,
        w: Math.max(0.1, Math.min(1 - prev.x, dragStart.cw + dx / dw)),
        h: Math.max(0.1, Math.min(1 - prev.y, dragStart.ch + dy / dh)),
      }));
    }
  };

  const handleConfirm = async () => {
    const img = imgElRef.current;
    if (!img) return;
    const out = document.createElement('canvas');
    out.width = Math.round(img.naturalWidth * cropBox.w);
    out.height = Math.round(img.naturalHeight * cropBox.h);
    const ctx = out.getContext('2d')!;
    ctx.drawImage(
      img,
      img.naturalWidth * cropBox.x, img.naturalHeight * cropBox.y,
      out.width, out.height,
      0, 0, out.width, out.height,
    );

    setUploadError('');
    setUploading(true);
    try {
      const blob = await new Promise<Blob | null>(resolve => out.toBlob(resolve, 'image/jpeg', 0.85));
      if (!blob) throw new Error('Không thể xử lý ảnh đã cắt.');
      const url = await uploadImage(blob, `${imageKey}.jpg`);
      onConfirm(imageKey, url);
      onClose();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Tải ảnh lên thất bại. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Đổi ảnh: {label}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Upload → chỉnh khung cắt → xác nhận</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {step === 'upload' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 gap-6">
            <div
              className="w-full max-w-md border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center gap-4 cursor-pointer hover:border-[#003f87] hover:bg-blue-50/30 transition-all"
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onClick={() => document.getElementById('img-upload')?.click()}
            >
              <Upload className="w-10 h-10 text-gray-300" />
              <p className="text-sm text-gray-500 text-center">Kéo thả ảnh vào đây hoặc <span className="text-[#003f87] font-semibold">chọn từ máy tính</span></p>
              <p className="text-xs text-gray-400">PNG, JPG, WebP — tối đa 10MB</p>
            </div>
            <input id="img-upload" type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            {currentUrl && (
              <button onClick={() => setStep('crop')} className="text-xs text-[#003f87] underline cursor-pointer">
                Dùng ảnh hiện tại và điều chỉnh cắt
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div
              ref={containerRef}
              className="relative bg-gray-900 flex-1 select-none cursor-crosshair"
              style={{ minHeight: 320 }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setDragging(null)}
                onMouseLeave={() => setDragging(null)}
              />
            </div>
            <div className="px-6 py-3 bg-gray-50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {uploadError ? (
                  <span className="text-xs text-red-500 truncate">{uploadError}</span>
                ) : (
                  <>
                    <Crop className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-xs text-gray-500">Kéo ảnh để di chuyển · Kéo góc dưới-phải để thay đổi kích thước</span>
                  </>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => { setStep('upload'); setImgSrc(null); }}
                  disabled={uploading}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-full hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Chọn lại
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={uploading}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#003f87] rounded-full hover:bg-[#002d63] flex items-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploading
                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tải lên...</>
                    : <><Check className="w-3.5 h-3.5" /> Xác nhận cắt</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
