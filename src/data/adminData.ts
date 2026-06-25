// ── Admin mock data ─────────────────────────────────────────────────────────

export type UserPlan = 'free' | 'pro' | 'enterprise';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type TxStatus = 'success' | 'pending' | 'failed' | 'refunded';
export type PayMethod = 'bank_transfer' | 'momo' | 'vnpay' | 'zalopay';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: UserPlan;
  status: UserStatus;
  websites: number;
  totalSpent: number;    // VND
  joinedAt: string;
  lastLogin: string;
  avatar: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  plan: string;
  planLabel: string;
  amount: number;        // VND
  status: TxStatus;
  method: PayMethod;
  paidAt: string;        // ISO string
  note?: string;
}

// ── Users ────────────────────────────────────────────────────────────────────

export const ADMIN_USERS: AdminUser[] = [
  {
    id: 'u001', name: 'Nguyễn Văn An', email: 'nguyenvanan@gmail.com',
    phone: '0901234501', plan: 'pro', status: 'active', websites: 3,
    totalSpent: 1194000, joinedAt: '2024-03-12', lastLogin: '2025-06-22',
    avatar: 'https://i.pravatar.cc/40?img=11',
  },
  {
    id: 'u002', name: 'Trần Thị Bích', email: 'tranthibich@gmail.com',
    phone: '0912345602', plan: 'free', status: 'active', websites: 1,
    totalSpent: 0, joinedAt: '2024-06-01', lastLogin: '2025-06-20',
    avatar: 'https://i.pravatar.cc/40?img=5',
  },
  {
    id: 'u003', name: 'Lê Hoàng Dũng', email: 'lehoangdung@gmail.com',
    phone: '0933456703', plan: 'enterprise', status: 'active', websites: 12,
    totalSpent: 8400000, joinedAt: '2023-11-05', lastLogin: '2025-06-23',
    avatar: 'https://i.pravatar.cc/40?img=15',
  },
  {
    id: 'u004', name: 'Phạm Minh Châu', email: 'phamminchau@gmail.com',
    phone: '0945678904', plan: 'pro', status: 'inactive', websites: 2,
    totalSpent: 597000, joinedAt: '2024-09-18', lastLogin: '2025-05-10',
    avatar: 'https://i.pravatar.cc/40?img=9',
  },
  {
    id: 'u005', name: 'Hoàng Thị Mai', email: 'hoangthimai@gmail.com',
    phone: '0956789005', plan: 'free', status: 'active', websites: 2,
    totalSpent: 0, joinedAt: '2025-01-22', lastLogin: '2025-06-21',
    avatar: 'https://i.pravatar.cc/40?img=20',
  },
  {
    id: 'u006', name: 'Vũ Đình Khoa', email: 'vudinhkhoa@gmail.com',
    phone: '0967890106', plan: 'pro', status: 'suspended', websites: 0,
    totalSpent: 199000, joinedAt: '2025-02-14', lastLogin: '2025-03-30',
    avatar: 'https://i.pravatar.cc/40?img=33',
  },
  {
    id: 'u007', name: 'Đặng Thị Hoa', email: 'dangthihoa@gmail.com',
    phone: '0978901207', plan: 'pro', status: 'active', websites: 4,
    totalSpent: 995000, joinedAt: '2024-07-09', lastLogin: '2025-06-22',
    avatar: 'https://i.pravatar.cc/40?img=47',
  },
  {
    id: 'u008', name: 'Bùi Quang Huy', email: 'buiquanghuy@gmail.com',
    phone: '0989012308', plan: 'enterprise', status: 'active', websites: 8,
    totalSpent: 4200000, joinedAt: '2024-01-30', lastLogin: '2025-06-23',
    avatar: 'https://i.pravatar.cc/40?img=60',
  },
  {
    id: 'u009', name: 'Ngô Thị Lan', email: 'ngothilan@gmail.com',
    phone: '0990123409', plan: 'free', status: 'inactive', websites: 0,
    totalSpent: 0, joinedAt: '2025-04-03', lastLogin: '2025-04-05',
    avatar: 'https://i.pravatar.cc/40?img=25',
  },
  {
    id: 'u010', name: 'Cao Văn Thành', email: 'caovanthanh@gmail.com',
    phone: '0901234010', plan: 'pro', status: 'active', websites: 2,
    totalSpent: 398000, joinedAt: '2025-03-15', lastLogin: '2025-06-19',
    avatar: 'https://i.pravatar.cc/40?img=70',
  },
];

// ── Transactions ──────────────────────────────────────────────────────────────

const METHOD_LABELS: Record<PayMethod, string> = {
  bank_transfer: 'Chuyển khoản',
  momo: 'MoMo',
  vnpay: 'VNPay',
  zalopay: 'ZaloPay',
};

export const METHOD_LABEL = (m: PayMethod) => METHOD_LABELS[m];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 'tx001', userId: 'u003', userName: 'Lê Hoàng Dũng', userEmail: 'lehoangdung@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=15',
    plan: 'enterprise', planLabel: 'Chuỗi Enterprise', amount: 1200000,
    status: 'success', method: 'bank_transfer', paidAt: '2025-06-20T09:14:22Z',
  },
  {
    id: 'tx002', userId: 'u001', userName: 'Nguyễn Văn An', userEmail: 'nguyenvanan@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=11',
    plan: 'pro', planLabel: 'Kinh Doanh WebPro', amount: 199000,
    status: 'success', method: 'momo', paidAt: '2025-06-19T14:32:10Z',
  },
  {
    id: 'tx003', userId: 'u008', userName: 'Bùi Quang Huy', userEmail: 'buiquanghuy@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=60',
    plan: 'enterprise', planLabel: 'Chuỗi Enterprise', amount: 1200000,
    status: 'success', method: 'vnpay', paidAt: '2025-06-18T11:05:55Z',
  },
  {
    id: 'tx004', userId: 'u007', userName: 'Đặng Thị Hoa', userEmail: 'dangthihoa@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=47',
    plan: 'pro', planLabel: 'Kinh Doanh WebPro', amount: 199000,
    status: 'success', method: 'zalopay', paidAt: '2025-06-17T16:48:03Z',
  },
  {
    id: 'tx005', userId: 'u006', userName: 'Vũ Đình Khoa', userEmail: 'vudinhkhoa@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=33',
    plan: 'pro', planLabel: 'Kinh Doanh WebPro', amount: 199000,
    status: 'failed', method: 'momo', paidAt: '2025-06-16T08:22:41Z',
    note: 'Số dư ví không đủ',
  },
  {
    id: 'tx006', userId: 'u010', userName: 'Cao Văn Thành', userEmail: 'caovanthanh@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=70',
    plan: 'pro', planLabel: 'Kinh Doanh WebPro', amount: 199000,
    status: 'success', method: 'bank_transfer', paidAt: '2025-06-15T13:10:17Z',
  },
  {
    id: 'tx007', userId: 'u004', userName: 'Phạm Minh Châu', userEmail: 'phamminchau@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=9',
    plan: 'pro', planLabel: 'Kinh Doanh WebPro', amount: 199000,
    status: 'refunded', method: 'vnpay', paidAt: '2025-06-12T10:00:00Z',
    note: 'Khách yêu cầu hoàn tiền',
  },
  {
    id: 'tx008', userId: 'u003', userName: 'Lê Hoàng Dũng', userEmail: 'lehoangdung@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=15',
    plan: 'enterprise', planLabel: 'Chuỗi Enterprise', amount: 1200000,
    status: 'success', method: 'bank_transfer', paidAt: '2025-05-20T09:00:00Z',
  },
  {
    id: 'tx009', userId: 'u001', userName: 'Nguyễn Văn An', userEmail: 'nguyenvanan@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=11',
    plan: 'pro', planLabel: 'Kinh Doanh WebPro', amount: 199000,
    status: 'success', method: 'momo', paidAt: '2025-05-19T07:55:30Z',
  },
  {
    id: 'tx010', userId: 'u008', userName: 'Bùi Quang Huy', userEmail: 'buiquanghuy@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=60',
    plan: 'enterprise', planLabel: 'Chuỗi Enterprise', amount: 1200000,
    status: 'pending', method: 'bank_transfer', paidAt: '2025-06-22T17:30:00Z',
    note: 'Chờ xác nhận chuyển khoản',
  },
  {
    id: 'tx011', userId: 'u007', userName: 'Đặng Thị Hoa', userEmail: 'dangthihoa@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=47',
    plan: 'pro', planLabel: 'Kinh Doanh WebPro', amount: 199000,
    status: 'success', method: 'zalopay', paidAt: '2025-05-17T09:12:00Z',
  },
  {
    id: 'tx012', userId: 'u010', userName: 'Cao Văn Thành', userEmail: 'caovanthanh@gmail.com',
    userAvatar: 'https://i.pravatar.cc/40?img=70',
    plan: 'pro', planLabel: 'Kinh Doanh WebPro', amount: 199000,
    status: 'success', method: 'momo', paidAt: '2025-05-15T14:04:09Z',
  },
];

// ── Summary helpers ──────────────────────────────────────────────────────────

export const ADMIN_STATS = {
  totalUsers: ADMIN_USERS.length,
  activeUsers: ADMIN_USERS.filter(u => u.status === 'active').length,
  proUsers: ADMIN_USERS.filter(u => u.plan === 'pro').length,
  enterpriseUsers: ADMIN_USERS.filter(u => u.plan === 'enterprise').length,
  totalRevenue: TRANSACTIONS.filter(t => t.status === 'success').reduce((s, t) => s + t.amount, 0),
  pendingRevenue: TRANSACTIONS.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0),
  failedTx: TRANSACTIONS.filter(t => t.status === 'failed').length,
  refundedAmount: TRANSACTIONS.filter(t => t.status === 'refunded').reduce((s, t) => s + t.amount, 0),
};
