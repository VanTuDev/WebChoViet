// Modal tạo website mới — 2 bước: chọn template → điền thông tin
import React, { useState, useMemo } from 'react';
import { X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../../data';
import { useAppContext } from '../../store/AppContext';
import type { Project } from '../../types';

export default function CreateSiteWizard() {
  const navigate = useNavigate();
  const { closeCreateModal, addProject, bumpMetric } = useAppContext();

  // ── Wizard form state (cục bộ trong modal) ────────────────────────────────
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('0987654321');
  const [logoText, setLogoText] = useState('');

  const selectedTemplate = useMemo(
    () => TEMPLATES.find(t => t.id === selectedTemplateId) ?? TEMPLATES[0],
    [selectedTemplateId],
  );

  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) { alert('Vui lòng điền tên cửa hàng!'); return; }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      templateId: selectedTemplate.id,
      storeName,
      description: description || selectedTemplate.description.substring(0, 80),
      lastUpdated: 'Vừa xong',
      status: 'Active',
      themeColor:
        selectedTemplate.category === 'spa'
          ? '#ec4899'
          : selectedTemplate.category === 'restaurant'
          ? '#10b981'
          : '#0056b3',
      phone,
      logoText: logoText || storeName.substring(0, 10).toUpperCase(),
      items: [...selectedTemplate.starterItems],
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://webchoviet.com/live/${Date.now()}`,
    };

    addProject(newProject);
    bumpMetric(1, Math.floor(Math.random() * 50) + 1);
    closeCreateModal();
    navigate('/dashboard/projects');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border overflow-hidden flex flex-col max-h-[90vh]">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between shrink-0">
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#0056b3] bg-[#e3f2fd] px-2.5 py-0.5 rounded-full inline-block">
              Bước {step} / 2
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-0.5">
              {step === 1 ? 'Lựa chọn Giao diện tốt nhất' : 'Thiết lập thông tin thương hiệu'}
            </h3>
          </div>
          <button
            onClick={closeCreateModal}
            className="p-1.5 hover:bg-gray-200 rounded-full cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-500">Mỗi giao diện được thiết kế riêng cho từng lĩnh vực kinh doanh.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEMPLATES.map(t => {
                  const selected = selectedTemplateId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTemplateId(t.id)}
                      className={`border rounded-2xl p-3 flex gap-3 items-center cursor-pointer transition-all ${
                        selected
                          ? 'border-[#00aaff] bg-[#e3f2fd]/20 ring-2 ring-[#00aaff]/20'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <img
                        src={t.imageUrl}
                        alt={t.name}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-xl object-cover shrink-0 border border-gray-100"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-gray-900 truncate">{t.name}</h4>
                        <p className="text-[10px] text-gray-500 capitalize pt-0.5">
                          {t.category === 'spa' ? 'Spa & Beauty' : t.category === 'coffee' ? 'Cafe' : t.category === 'restaurant' ? 'Restaurant' : 'Retail'}
                        </p>
                        <span className="text-[9px] font-bold text-[#0056b3] bg-[#e3f2fd] px-1.5 rounded mt-1 inline-block">
                          {t.priceText}
                        </span>
                      </div>
                      {selected && (
                        <span className="h-5 w-5 rounded-full bg-[#00aaff] text-white flex items-center justify-center shrink-0">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleFinalize} className="space-y-4" id="wizard-form">
              {/* Preview template đã chọn */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-xs">
                <img src={selectedTemplate.imageUrl} className="h-10 w-10 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                <div>
                  <span className="text-gray-500">Giao diện đã chọn: </span>
                  <strong className="text-[#0056b3]">{selectedTemplate.name}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Tên Cửa Hàng / Website *</label>
                  <input
                    type="text" required
                    value={storeName}
                    onChange={e => setStoreName(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 py-2.5 px-3 focus:outline-none focus:border-[#0056b3] focus:ring-1 focus:ring-[#0056b3]/20"
                    placeholder="Ví dụ: Cà Phê Trứng Hà Nội"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Tên hiển thị Logo</label>
                  <input
                    type="text"
                    value={logoText}
                    onChange={e => setLogoText(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 py-2.5 px-3 focus:outline-none focus:border-[#0056b3]"
                    placeholder="Ví dụ: CP TRỨNG"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Số Điện Thoại Zalo</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 py-2.5 px-3 focus:outline-none focus:border-[#0056b3]"
                    placeholder="0987654321"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Mô tả tóm tắt</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                  className="w-full text-xs rounded-xl border border-gray-200 py-2.5 px-3 focus:outline-none focus:border-[#0056b3]"
                  placeholder="Một dòng giới thiệu thật ngọt ngào, ấm cúng..."
                />
              </div>
            </form>
          )}
        </div>

        {/* ── Footer Actions ─────────────────────────────────────────────── */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-between shrink-0">
          <button
            type="button"
            className={`px-4 py-2 text-xs font-bold text-gray-600 border rounded-full hover:bg-gray-100 transition-colors cursor-pointer ${
              step === 1 ? 'invisible' : ''
            }`}
            onClick={() => setStep(1)}
          >
            Quay lại bước 1
          </button>

          <button
            type="button"
            className="px-6 py-2.5 bg-[#0056b3] hover:bg-[#003f87] text-white text-xs font-bold rounded-full cursor-pointer hover:shadow active:scale-95 transition-all"
            onClick={e => {
              if (step === 1) setStep(2);
              else handleFinalize(e as unknown as React.FormEvent);
            }}
          >
            {step === 1 ? 'Tiếp tục thiết lập' : 'Hoàn tất khởi tạo ⚡'}
          </button>
        </div>
      </div>
    </div>
  );
}
