// Trang editor toàn màn hình — không có Navbar/Sidebar (route riêng biệt)
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import EditorControls from './_components/EditorControls';
import PhoneSimulator from './_components/PhoneSimulator';
import type { MenuItem, Project } from '../../types';

export default function EditorPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects, updateProject } = useAppContext();

  const project = projects.find(p => p.id === projectId);

  // Nếu không tìm thấy project → redirect về dashboard
  if (!project) {
    navigate('/dashboard/projects', { replace: true });
    return null;
  }

  // ── Local edit state (chỉ commit khi bấm Lưu) ─────────────────────────────
  const [storeName, setStoreName] = useState(project.storeName);
  const [description, setDescription] = useState(project.description);
  const [phone, setPhone] = useState(project.phone);
  const [logoText, setLogoText] = useState(project.logoText);
  const [themeColor, setThemeColor] = useState(project.themeColor);
  const [items, setItems] = useState<MenuItem[]>([...project.items]);

  const handleUpdateItem = (id: string, field: keyof MenuItem, value: unknown) =>
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));

  const handleAddItem = (item: MenuItem) => setItems(prev => [...prev, item]);

  const handleDeleteItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const handleSave = () => {
    const updated: Project = {
      ...project,
      storeName, description, phone, logoText, themeColor, items,
      lastUpdated: 'Vừa xong',
    };
    updateProject(updated);
    navigate('/dashboard/projects');
  };

  return (
    <div className="flex flex-col bg-gray-50 h-screen overflow-hidden font-sans">

      {/* ── Editor top bar ───────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/projects')}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="text-[10px] uppercase font-extrabold tracking-wider text-gray-400">Trình Chỉnh Sửa Website</div>
            <h1 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              {project.storeName}
              <span className="h-1.5 w-1.5 bg-[#00aaff] rounded-full animate-pulse" />
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/dashboard/projects')}
            className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-900 bg-white rounded-full text-xs font-semibold cursor-pointer active:scale-95 transition-all"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#0056b3] hover:bg-[#003f87] text-white rounded-full text-xs font-bold cursor-pointer active:scale-95 shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Save className="h-4 w-4" />
            Xong & Lưu Thay Đổi
          </button>
        </div>
      </div>

      {/* ── Split panel: Controls (left) + Phone preview (right) ─────────── */}
      <div className="flex-1 flex overflow-hidden">
        <EditorControls
          storeName={storeName} setStoreName={setStoreName}
          description={description} setDescription={setDescription}
          phone={phone} setPhone={setPhone}
          logoText={logoText} setLogoText={setLogoText}
          themeColor={themeColor} setThemeColor={setThemeColor}
          items={items}
          onUpdateItem={handleUpdateItem}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
        />

        <PhoneSimulator
          storeName={storeName}
          logoText={logoText}
          description={description}
          phone={phone}
          themeColor={themeColor}
          items={items}
        />
      </div>
    </div>
  );
}
