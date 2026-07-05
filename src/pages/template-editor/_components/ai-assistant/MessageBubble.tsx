import { Check } from 'lucide-react';
import type { ChatMessage } from './types';
import DiffPreview from './DiffPreview';

interface Props {
  message: ChatMessage;
  currentData: Record<string, unknown>;
  onApply: (msgId: number, updates: Record<string, unknown>) => void;
  onDismiss: (msgId: number) => void;
}

export default function MessageBubble({ message: m, currentData, onApply, onDismiss }: Props) {
  return (
    <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
          m.role === 'user'
            ? 'bg-blue-600 text-white'
            : m.error
            ? 'bg-red-50 text-red-600 border border-red-200'
            : 'bg-violet-50 text-gray-700 border border-violet-100'
        }`}
      >
        <p>{m.content}</p>
        {m.updates && m.status === 'pending' && (
          <>
            <DiffPreview updates={m.updates} current={currentData} />
            <div className="flex gap-1.5 mt-2">
              <button
                onClick={() => onApply(m.id, m.updates!)}
                className="flex-1 flex items-center justify-center gap-1 text-[11px] font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg py-1.5 transition-colors"
              >
                <Check className="w-3 h-3" /> Áp dụng
              </button>
              <button
                onClick={() => onDismiss(m.id)}
                className="flex-1 text-[11px] font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg py-1.5 transition-colors"
              >
                Bỏ qua
              </button>
            </div>
          </>
        )}
        {m.status === 'applied' && <p className="text-[10px] text-emerald-600 font-bold mt-1.5">✓ Đã áp dụng</p>}
        {m.status === 'dismissed' && <p className="text-[10px] text-gray-400 font-bold mt-1.5">Đã bỏ qua</p>}
      </div>
    </div>
  );
}
