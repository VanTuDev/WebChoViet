import { Loader2, Send, Sparkles, X } from 'lucide-react';
import { PANEL_WIDTH, PANEL_HEIGHT } from './constants';
import type { ChatMessage } from './types';
import MessageBubble from './MessageBubble';

interface Props {
  left: number;
  top: number;
  messages: ChatMessage[];
  currentData: Record<string, unknown>;
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onApply: (msgId: number, updates: Record<string, unknown>) => void;
  onDismiss: (msgId: number) => void;
  onClose: () => void;
}

export default function ChatPanel({
  left, top, messages, currentData, input, loading, onInputChange, onSend, onApply, onDismiss, onClose,
}: Props) {
  return (
    <div
      className="fixed z-9997 flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
      style={{ left, top, width: PANEL_WIDTH, height: PANEL_HEIGHT }}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-violet-600 text-white shrink-0">
        <span className="flex items-center gap-1.5 text-sm font-bold">
          <Sparkles className="w-4 h-4" /> Trợ lý nội dung AI
        </span>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/20 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-xs text-gray-400 leading-relaxed">
            Mô tả điều bạn muốn thay đổi, ví dụ: "Viết lại slogan cho sang trọng hơn" hoặc
            "Thêm 1 món cà phê muối vào menu". Trợ lý sẽ đề xuất, bạn xem trước và bấm Áp dụng.
          </p>
        )}
        {messages.map(m => (
          <MessageBubble key={m.id} message={m} currentData={currentData} onApply={onApply} onDismiss={onDismiss} />
        ))}
        {loading && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang suy nghĩ...
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 p-2 border-t border-gray-100 shrink-0">
        <input
          type="text"
          value={input}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') onSend();
          }}
          placeholder="Nhắn cho trợ lý AI..."
          disabled={loading}
          className="flex-1 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-violet-400 transition-all disabled:opacity-60"
        />
        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 transition-colors shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
