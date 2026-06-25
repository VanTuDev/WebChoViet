import { useState, useMemo } from 'react';
import {
  Search, Plus, Pencil, Trash2, Ban, CheckCircle2, X,
  Users, ChevronDown,
} from 'lucide-react';
import { ADMIN_USERS, AdminUser, UserPlan, UserStatus } from '../../../data/adminData';

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

const PLAN_BADGE: Record<UserPlan, string> = {
  free:       'bg-slate-700 text-slate-300',
  pro:        'bg-blue-500/20 text-blue-300',
  enterprise: 'bg-violet-500/20 text-violet-300',
};
const PLAN_LABEL: Record<UserPlan, string> = { free: 'Free', pro: 'Pro', enterprise: 'Enterprise' };

const STATUS_BADGE: Record<UserStatus, string> = {
  active:    'bg-emerald-500/10 text-emerald-400',
  inactive:  'bg-slate-700 text-slate-400',
  suspended: 'bg-rose-500/10 text-rose-400',
};
const STATUS_LABEL: Record<UserStatus, string> = {
  active: 'Hoạt động', inactive: 'Không hoạt động', suspended: 'Tạm khóa',
};

const EMPTY_FORM = { name: '', email: '', phone: '', plan: 'free' as UserPlan };

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);
  const [q, setQ] = useState('');
  const [filterPlan, setFilterPlan] = useState<UserPlan | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'all'>('all');

  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const filtered = useMemo(() => users.filter(u => {
    const matchQ = !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase());
    const matchPlan = filterPlan === 'all' || u.plan === filterPlan;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchQ && matchPlan && matchStatus;
  }), [users, q, filterPlan, filterStatus]);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditTarget(null);
    setModalMode('add');
  };

  const openEdit = (u: AdminUser) => {
    setEditTarget(u);
    setForm({ name: u.name, email: u.email, phone: u.phone, plan: u.plan });
    setModalMode('edit');
  };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (modalMode === 'add') {
      const newUser: AdminUser = {
        id: `u${Date.now()}`,
        ...form,
        status: 'active',
        websites: 0,
        totalSpent: 0,
        joinedAt: new Date().toISOString().slice(0, 10),
        lastLogin: new Date().toISOString().slice(0, 10),
        avatar: `https://i.pravatar.cc/40?u=${form.email}`,
      };
      setUsers(prev => [newUser, ...prev]);
    } else if (editTarget) {
      setUsers(prev => prev.map(u => u.id === editTarget.id ? { ...u, ...form } : u));
    }
    setModalMode(null);
  };

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      return { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' };
    }));
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Người dùng</h1>
          <p className="text-sm text-slate-400 mt-0.5">{users.length} tài khoản · {users.filter(u => u.status === 'active').length} đang hoạt động</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 h-9 px-4 bg-[#0056b3] hover:bg-[#004699] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Thêm người dùng
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#0056b3] transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={filterPlan}
            onChange={e => setFilterPlan(e.target.value as UserPlan | 'all')}
            className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-[#0056b3] cursor-pointer transition-all"
          >
            <option value="all">Tất cả gói</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as UserStatus | 'all')}
            className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-[#0056b3] cursor-pointer transition-all"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="suspended">Tạm khóa</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Người dùng', 'Gói', 'Trạng thái', 'Websites', 'Chi tiêu', 'Ngày tham gia', 'Thao tác'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-slate-500 text-sm py-12">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              ) : filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer" />
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{u.name}</p>
                        <p className="text-xs text-slate-400 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${PLAN_BADGE[u.plan]}`}>
                      {PLAN_LABEL[u.plan]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_BADGE[u.status]}`}>
                      {STATUS_LABEL[u.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-300">{u.websites}</td>
                  <td className="px-5 py-3.5 font-medium text-emerald-400">{u.totalSpent > 0 ? fmt(u.totalSpent) : '—'}</td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs">
                    {new Date(u.joinedAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(u)}
                        title="Chỉnh sửa"
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        title={u.status === 'suspended' ? 'Mở khóa' : 'Tạm khóa'}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          u.status === 'suspended'
                            ? 'text-emerald-400 hover:bg-emerald-500/10'
                            : 'text-amber-400 hover:bg-amber-500/10'
                        }`}
                      >
                        {u.status === 'suspended' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(u)}
                        title="Xóa"
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">
                {modalMode === 'add' ? 'Thêm người dùng mới' : 'Chỉnh sửa người dùng'}
              </h2>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: 'Họ và tên', key: 'name', type: 'text', placeholder: 'Nguyễn Văn A' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'email@example.com' },
                { label: 'Số điện thoại', key: 'phone', type: 'text', placeholder: '09xxxxxxxx' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
                  <input
                    type={type}
                    value={(form as Record<string, string>)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#0056b3] transition-all"
                  />
                </div>
              ))}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gói dịch vụ</label>
                <div className="relative">
                  <select
                    value={form.plan}
                    onChange={e => setForm(f => ({ ...f, plan: e.target.value as UserPlan }))}
                    className="w-full appearance-none bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 pr-9 py-3 focus:outline-none focus:border-[#0056b3] cursor-pointer transition-all"
                  >
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setModalMode(null)}
                className="flex-1 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex-1 h-10 bg-[#0056b3] hover:bg-[#004699] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {modalMode === 'add' ? 'Thêm' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-rose-400" />
            </div>
            <h2 className="text-base font-bold text-white mb-1">Xác nhận xóa</h2>
            <p className="text-sm text-slate-400 mb-6">
              Bạn sắp xóa tài khoản <span className="text-white font-medium">{deleteTarget.name}</span>. Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 h-10 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
