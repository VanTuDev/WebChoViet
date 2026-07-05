import { useRef } from 'react';
import { Bot } from 'lucide-react';
import { BUTTON_SIZE, DRAG_THRESHOLD } from './constants';

interface Props {
  left: number;
  top: number;
  /** Gọi liên tục trong lúc kéo — vị trí đã clamp trong màn hình */
  onDrag: (pos: { left: number; top: number }) => void;
  /** Chỉ gọi khi nhả chuột/tay mà KHÔNG kéo (click thật để mở/đóng panel) */
  onClick: () => void;
}

/** Nút tròn nổi, kéo được đi bất kỳ đâu trên màn hình — vị trí do component cha quản lý (controlled) */
export default function FloatingButton({ left, top, onDrag, onClick }: Props) {
  const dragState = useRef<{ startX: number; startY: number; baseLeft: number; baseTop: number; moved: boolean } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragState.current = { startX: e.clientX, startY: e.clientY, baseLeft: left, baseTop: top, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragState.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    drag.moved = true;
    const newLeft = Math.max(4, Math.min(drag.baseLeft + dx, window.innerWidth - BUTTON_SIZE - 4));
    const newTop = Math.max(4, Math.min(drag.baseTop + dy, window.innerHeight - BUTTON_SIZE - 4));
    onDrag({ left: newLeft, top: newTop });
  };

  const handlePointerUp = () => {
    const wasDrag = dragState.current?.moved ?? false;
    dragState.current = null;
    if (!wasDrag) onClick();
  };

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      title="Trợ lý AI"
      className="fixed z-9998 flex items-center justify-center rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-2xl transition-colors touch-none"
      style={{ left, top, width: BUTTON_SIZE, height: BUTTON_SIZE }}
    >
      <Bot className="w-6 h-6" />
    </button>
  );
}
