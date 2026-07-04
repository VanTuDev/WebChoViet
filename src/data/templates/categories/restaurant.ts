/**
 * Category: restaurant — xem src/data/Template/restaurant/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_restaurant1 from '../../Template/restaurant/Restaurant-1/i18n/vi.json';
import schema_restaurant2 from '../../Template/restaurant/Restaurant-2/i18n/vi.json';

export const RESTAURANT_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'restaurant-1',
    name: 'Phố Ẩm Thực',
    description: 'Giao diện ấm cúng tông nâu gỗ cho nhà hàng Việt Nam truyền thống. Hero fullscreen với overlay, menu 6 món đặc sắc dạng card, info bar nâu sang trọng. Phù hợp quán ăn, nhà hàng gia đình.',
    category: 'restaurant',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Nhà Hàng', 'Ẩm Thực Việt', 'Đặt Bàn'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/restaurant/Restaurant-1/index')),
    schema: schema_restaurant1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=70' },
    ],
  },

  {
    id: 'restaurant-2',
    name: 'Bếp Việt Premium',
    description: 'Nhà hàng cao cấp phong cách corporate hiện đại. Hero fullscreen thanh lịch, menu bento 4 món đặc sắc, đánh giá khách hàng dạng glassmorphism, form đặt bàn đầy đủ kèm bản đồ. Hỗ trợ sẵn 4 ngôn ngữ Việt/Anh/Trung/Hàn.',
    category: 'restaurant',
    price: 399000,
    priceText: '399,000đ',
    badge: 'MỚI',
    tags: ['Nhà Hàng Cao Cấp', 'Form Đặt Bàn', '4 Ngôn Ngữ'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuNJKsVVEub2XrxwixfWUZFdeVSFVaRcHA9Pp8idqGdpo5XxyPjvcYyxolWD8ja9a0WbE_UgREkTTO_aEwUjHJk7J5nPIA4OhgYqEUjrGDlosy6aURrOt_syn_n91Ge98QFP8GmH7ucHN9syKdoO8dy6lmisB5KYflUsKxt8Xn8MKfHsNR5tszeVi0f9elP-DQc9UtzBs79sP0MpRNm3Y7zjKQWZu6p7LuRbEyE9QcIQh7nk13hrhWe3813IpqcvrXVRfE_cJOtLA',
    component: lazy(() => import('../../Template/restaurant/Restaurant-2/index')),
    schema: schema_restaurant2 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',     label: 'Ảnh nền Hero',      defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuNJKsVVEub2XrxwixfWUZFdeVSFVaRcHA9Pp8idqGdpo5XxyPjvcYyxolWD8ja9a0WbE_UgREkTTO_aEwUjHJk7J5nPIA4OhgYqEUjrGDlosy6aURrOt_syn_n91Ge98QFP8GmH7ucHN9syKdoO8dy6lmisB5KYflUsKxt8Xn8MKfHsNR5tszeVi0f9elP-DQc9UtzBs79sP0MpRNm3Y7zjKQWZu6p7LuRbEyE9QcIQh7nk13hrhWe3813IpqcvrXVRfE_cJOtLA' },
      { key: 'about',    label: 'Ảnh giới thiệu',    defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdzKzfgz2z8GOu7P7YZb7UwCrIPmmUEWCk5qZUeT1e9AxHPhAccvZSmb12Nhrwh8VSAOpP_OyGEBuU67PaxL0NipaNq5UfbeLlDjtAG05HQ2asw5yzbJGwRx21xMkdSUoxVXdIq3hg0W_9gqRi1ksBFlJtAvpeLIQGPm_X7sUuW6uuf8uoOl_Uz-YLcUq80UCEVCrBorDxIivdCW4ORdxRND94p67c8Y5fQeG0ZrEWqzYiJedkql3YsyrgSBdNh-dzEQS1ak6Cg_g' },
      { key: 'menu_0',   label: 'Món 1 (Phở Bò)',    defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpbNvqUFnk81qPPbsy7ZsskJmVNTtJHeV4Jt4RAy5mHm2-0LdTKvDu4tt1fcv1NfdIM54UvJVpTdFEY69kuGVAG5aU_XeWk-mIxpHCAY7r_5-Ddzr5YIKuMFs0KQ4AEhUlmMDpdbQdI50Wyiu2aCOMCD3BDFZgZNHdgaY6iXruhkHN_6zbwmCQzUnMXZlwNheZWgfV9aTD_50h4lsaLyvnVcOObOk50VJXbRC2cvNFkdNoUT9QmHXvfpiO0iMPpMocF7_938HDcwM' },
      { key: 'menu_1',   label: 'Món 2 (Gỏi Cuốn)',  defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsB-uITM0-P_zCzfpyvtcB-chdJ98pfi9L6z502YVRUBEUKteTdlP4GOJsAzhM3H39ekIdZAGpnDu4_Varfw11QbM7g-LCokua_qZlCymTPk2PD___p9o-3BO993badPmS1m0dlCP4oHC1k4G4nbofFOud_Ec8uAiUfZ9WzRvDch7IbIJoR_Fi6XmgfSHZiO6xNY5fkhbKgHJFNOC7kg5y1qd2N73wZJ36P73tsYZSwlZu3X4OcH_uNOkt-PmbJYjacOIloFZ8stA' },
      { key: 'menu_2',   label: 'Món 3 (Chả Cá)',    defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjjPNZajionLOIhPddznCC07fBM7BHNNn8gpH8_qYz9WDJ-f2i3hYMQ5AwOprb6O_Pqf36Zk3eQfv_fE2TMR5WIetgA4Fy2xjsuCOZydMUHsSo2YVBN758SC5FpafDxEb1SYZYINADjvRkT7dDn0zrlcQ5kLffJ3uDQbP_knPDiNbdIhquksVXD_daOKh6r3reMIggRm8q1c3lpAwyaeOtGqDTvjfts7-QBQ5JjIy9xMbsgWBvVnKzWarjUgTjrvPUtYVvlENOPWI' },
      { key: 'menu_3',   label: 'Món 4 (Chè Sen)',   defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlGIhcYaT5XPme-KEAJPXZ8qFcnDz0F69G6WGQmMgMxtf94G2j-i8c-P7rS3XOy1L0iJAvtbpIPncYzOAwu56vTVEbmq3ubXdBgo7oYiGQ43yQBOCm0ODYLcWJuaCr2Czu-PakNNg8fO4bpz4VqZRooKmE4p-23HxSQghS2phDuf0NIYYUSiAe2-7AzIgNU-z2jy212oxl2tyKOQ0xtrWfipvFWiajIiJuX3tpcGinFO-99W5UANq8tVgVqvzY4jeOQ-FPpLSXowc' },
      { key: 'avatar_0', label: 'Avatar đánh giá 1', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZKOnBoYSb2M6P54XDliYEoZARJs3lpcUFjYEsfjoYZn--8QuYHGT75zT9Gog6IF4WtZF7fWK4nWq9IEtYJecECaXaJwG4QT3XAb9t-vEwdstXvSSiVDiq-KKfp1Q3PXVg6S-MevssAB56-H5_f2yE-MZC-l6gPpdwLyART01dVqnxn9PnZHFCMk_wm3q7p5TeR4Ik8cIEoOlBxZ4AXJRDf6sgCksZ8KczV6AxSIrOpGjiPSSF-bzStRocVyXwo4A9zJWhmY4EA0M' },
      { key: 'avatar_1', label: 'Avatar đánh giá 2', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXM25VyLnDj6_UlcUry68XrSx4K4vZb1SYDzq41ns8OS-eZv-vuMF2JXW-51spcqJQGiPrKS49OqjnRXJ7UfIPb1ryxSW-nKUDd5_FORThbgGlJK_vmtNX8auXzcVzqIWGy6cN5NySxuoaTPciMZm-Inpxds5YpmntR9KvWruecvoF6u-cr7gOXTA8PFD1oN3oXcnOaY-hlKV_L35WwFSY9tSbtOeIFFe0BHTHV_ywu66iXHz2GrutLbvTPldQPnZotHCxLDNdi1c' },
      { key: 'avatar_2', label: 'Avatar đánh giá 3', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFHOLLVgJuUc0U5c27Mg_fi5Q7jN2VscsuUxmOEBHCO3mPxFqfZk7lxj5rije66ZkMWToqT_4jDtm0fyOxvGrDUVQaEVk_19-braOqKOe9zRWMXVNdlHYcwbzpFh954r7SvG-OX1ANquWGOjxbF_fE1Fkl0liE5COWioNGuyha-eaPUtR1VVgfE2nIDUbKyEMOgwTKz8GcUBFekGSqNK-1FCfyXaxEqUo-TBeb1OuwfYQBIO-kBA81mwo0Q32uf3ZgVttJLyptHjA' },
      { key: 'map',      label: 'Ảnh bản đồ',        defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY3aqjhEQPHFnoB6qnFpzJgJypCqe81jG8WQgPpwlMz1nh-VWGyqE8p0psHib3szNTaflMsp4q_4Rq_i15WksZNZeHm3zDxZQh7BSB5C6r83Krxt9wzuOtrBFIbG4nGRm5FT0O8gealQzZi98wWMHQTbnBAOiV4E1T4kx_2nl23lUl_lJtyAHOhlSVbxu1cxTYmloWsLxajPt9Ai3aQleZKCaXtzi2a1yUACdAW38OKj3lTZiAY5XVcWMTPQyti3vYtbHRrftzwTc' },
    ],
  },
];
