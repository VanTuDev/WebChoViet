import { useRef, useState } from 'react';
import { sendAiAssistantMessage } from '../../../services/aiAssistantService';
import type { AiChatTurn } from '../../../services/aiAssistantService';
import { BUTTON_SIZE, PANEL_WIDTH, PANEL_HEIGHT } from './ai-assistant/constants';
import type { ChatMessage } from './ai-assistant/types';
import FloatingButton from './ai-assistant/FloatingButton';
import ChatPanel from './ai-assistant/ChatPanel';

interface Props {
  shopName: string;
  schema: Record<string, unknown>;
  currentData: Record<string, unknown>;
  onApply: (updates: Record<string, unknown>) => void;
}

/**
 * Trợ lý AI dạng chat nổi (kéo được đi khắp màn hình) — chỉ lo state/luồng dữ
 * liệu ở đây; UI được chia nhỏ trong thư mục `ai-assistant/` (nút nổi, panel
 * chat, từng bong bóng tin nhắn, diff preview) để dễ bảo trì từng phần riêng.
 */
export default function AiAssistantWidget({ shopName, schema, currentData, onApply }: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const nextId = useRef(1);

  const buttonLeft = pos?.left ?? window.innerWidth - BUTTON_SIZE - 24;
  const buttonTop = pos?.top ?? window.innerHeight - BUTTON_SIZE - 24;

  // Panel bám theo nút, tự lật lên/xuống để không tràn ra ngoài màn hình
  const panelLeft = Math.max(8, Math.min(buttonLeft, window.innerWidth - PANEL_WIDTH - 8));
  const panelTop =
    buttonTop - PANEL_HEIGHT - 8 > 8
      ? buttonTop - PANEL_HEIGHT - 8
      : Math.min(buttonTop + BUTTON_SIZE + 8, window.innerHeight - PANEL_HEIGHT - 8);

  const handleSend = async () => {
    const message = input.trim();
    if (!message || loading) return;
    setInput('');
    setMessages(prev => [...prev, { id: nextId.current++, role: 'user', content: message }]);
    setLoading(true);

    try {
      const history: AiChatTurn[] = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const result = await sendAiAssistantMessage({ shopName, schema, currentData, message, history });
      const hasUpdates = Object.keys(result.updates).length > 0;
      setMessages(prev => [
        ...prev,
        {
          id: nextId.current++,
          role: 'assistant',
          content: result.reply,
          updates: hasUpdates ? result.updates : undefined,
          status: hasUpdates ? 'pending' : undefined,
        },
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: nextId.current++,
          role: 'assistant',
          content: e instanceof Error ? e.message : 'Có lỗi xảy ra, vui lòng thử lại.',
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (msgId: number, updates: Record<string, unknown>) => {
    onApply(updates);
    setMessages(prev => prev.map(m => (m.id === msgId ? { ...m, status: 'applied' } : m)));
  };

  const handleDismiss = (msgId: number) => {
    setMessages(prev => prev.map(m => (m.id === msgId ? { ...m, status: 'dismissed' } : m)));
  };

  return (
    <>
      <FloatingButton left={buttonLeft} top={buttonTop} onDrag={setPos} onClick={() => setOpen(o => !o)} />
      {open && (
        <ChatPanel
          left={panelLeft}
          top={panelTop}
          messages={messages}
          currentData={currentData}
          input={input}
          loading={loading}
          onInputChange={setInput}
          onSend={handleSend}
          onApply={handleApply}
          onDismiss={handleDismiss}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
