import { useState, useEffect, useRef } from 'react';
import { X, RotateCcw } from 'lucide-react';

interface Props {
  initialValue: string;
  fieldLabel: string;
  rect: DOMRect;
  /** Called on every keystroke — template updates in real-time */
  onChange: (value: string) => void;
  /** Just close (changes already applied) */
  onClose: () => void;
  /** Restore original value and close */
  onUndo: () => void;
}

export default function InlineEditOverlay({ initialValue, fieldLabel, rect, onChange, onClose, onUndo }: Props) {
  const [text, setText] = useState(initialValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isLong = initialValue.length > 80;

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  // Position below element; clamp to viewport
  const top = Math.min(rect.bottom + 8, window.innerHeight - 160);
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - 308));

  return (
    <>
      {/* Click outside → confirm (changes already live) */}
      <div className="fixed inset-0 z-[9998]" onMouseDown={onClose} />

      <div
        className="fixed z-[9999] bg-white rounded-xl shadow-2xl border border-blue-300 p-3 w-72"
        style={{ top, left }}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
            ✏️ {fieldLabel.replace(/[._]/g, ' ')}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={onUndo}
              title="Hoàn tác (Esc)"
              className="p-1 rounded text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              title="Xong"
              className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <textarea
          ref={inputRef}
          className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-blue-400 transition-all"
          rows={isLong ? 3 : 1}
          value={text}
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key === 'Enter' && (!isLong || e.ctrlKey)) { e.preventDefault(); onClose(); }
            if (e.key === 'Escape') onUndo();
          }}
        />
        <p className="text-[10px] text-gray-400 mt-1">
          {isLong ? 'Ctrl+Enter để xong · Esc hoàn tác' : 'Enter để xong · Esc hoàn tác'}
        </p>
      </div>
    </>
  );
}
