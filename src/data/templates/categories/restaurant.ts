/**
 * Category: restaurant — xem src/data/Template/restaurant/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_restaurant1 from '../../Template/restaurant/Restaurant-1/i18n/vi.json';
import schema_restaurant2 from '../../Template/restaurant/Restaurant-2/i18n/vi.json';
import schema_restaurant3 from '../../Template/restaurant/Restaurant-3/i18n/vi.json';
import schema_restaurant4 from '../../Template/restaurant/Restaurant-4/i18n/vi.json';
import schema_restaurant5 from '../../Template/restaurant/Restaurant-5/i18n/vi.json';
import schema_restaurant6 from '../../Template/restaurant/Restaurant-6/i18n/vi.json';
import schema_restaurant7 from '../../Template/restaurant/Restaurant-7/i18n/vi.json';

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
  {
    id: 'restaurant-3',
    name: 'Sizzling Hearth',
    description: 'Trải nghiệm hương vị lẩu truyền thống tinh tế trong không gian hiện đại và ấm cúng.',
    category: 'restaurant',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá","Đặt Lịch"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiaJgeHhbOFHgymMN0SFz6mD_9gmm1R9mGz51tE7yR63holMlbe10AL9W4V-sAsFsIN-o7F-KUPSCSJzJyQm5FxWGNCQyNtJjNoBYN_qzGYO8XZSXIs3nXNrFMW_X-yyHk7LW_-Y4pqmkYwbEGzJzTFOBWjUL5oYmip7wWZLsnFQ1i37CHp76O9Qw9VRaAPD6d5D8XUvCSdWvYt8kIS3i_xtWxNGANSeKSOGiyMlfTJrUNSi1Np2rW',
    component: lazy(() => import('../../Template/restaurant/Restaurant-3/index')),
    schema: schema_restaurant3 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "hero",
              "label": "Ảnh Hero",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDiaJgeHhbOFHgymMN0SFz6mD_9gmm1R9mGz51tE7yR63holMlbe10AL9W4V-sAsFsIN-o7F-KUPSCSJzJyQm5FxWGNCQyNtJjNoBYN_qzGYO8XZSXIs3nXNrFMW_X-yyHk7LW_-Y4pqmkYwbEGzJzTFOBWjUL5oYmip7wWZLsnFQ1i37CHp76O9Qw9VRaAPD6d5D8XUvCSdWvYt8kIS3i_xtWxNGANSeKSOGiyMlfTJrUNSi1Np2rW"
        },
        {
              "key": "broth",
              "label": "broth",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCm2ObKvxndK7fecM3kDPru86xKM1NjAHReehC28qUrFTp0dZluXLKWjMy7eR3exlTt2rU3vE1c68jdpVoi0rCZXl2jaq_ux75jJLuDq-yweQYFV4AN97taxpjA8UcTkvbITpExomnj3z7GOH3ef0_rLlUKXdbDkkATMY7Te4kTJmUBlFa8VWvDoXPSG1i9QwgCWhmPxADV6SGdLUaYXkyJzqtyLk8K7txL-O3xnDI5YGFL54OXQzSh"
        },
        {
              "key": "wagyu",
              "label": "wagyu",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDY_232H2L2Ank8Ddb1cl54JdGNm2NhXY-zHgCDYBDLUbOd7KcGf1q6-mdQuXoK1JxGTLmQ1LGAY19UO2Z4iSwcPeyXTh6X-XEEGnSEGC0y2jieWIq5NlI70lBgLEkBqwF7i2rERQVbfUqcPv89rTbc2lnLtwwtX2E9qQhVpO7a7Gx9WsUvYP6X5_sTlyxUgNix_AN8AM1SyhvVytf2AYspX_MtvksUvA3fgE63V2GlMHEZn9XNpkcI"
        },
        {
              "key": "seafood",
              "label": "seafood",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC6vc1XIo5GcSaJlK7jtYax3u73WPrlVYpDojbpbDV6CGWTTXRWrqpuid99qErCGRcxNjmjX7_EuO5V335KNxsTZG4g2lNibpMB4tnBxD1GgYRjKZn0l8MLH5ajRPc1LDwgpQxn2oKTv7SQkqzIOF9G3cGaAjRWrA45cib-2voJmofvocrI8ikZ5jxxPPlf7FeCDiJt0ikueC0pK6lfnhHn4MjMygfuixVY4r0LKRKB-aL9EDe28o-4"
        },
        {
              "key": "private",
              "label": "private",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDPcX-9srf7yVKVs1n90ZIW50GMUGcWsGVmkFrNJL0yc8m2raiHbnTrJoXXO-SEZdGdUZuSfGzREHqfa56XKU6Tt-TK8DPu3R1UtWVESMvuUoZaS2dkLcBrw0wFr2PydY8YSz8uNtoA6fU4VIFRwUpK9IdbgeTwpelb2_ch0RXNBDtW_L91VMftV05CuZ_bC6CwXafjzwyrYgKXPtLFTj4jjcI3DzTLljaeYPa91-ZTdUhrufGQy-yW"
        },
        {
              "key": "group",
              "label": "group",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-9LQ5Js6lARZILNsvsVI79qyXwD0Ay_GZZri0ZoA1d0cwFLdVK6kUYR-HcLKrV0sO_zIAG_TJObQXu8lTqbChNSHvwl9iRFvGPtBuBqYAD-Lgct1TynuHnQa3Bd-AhrXXK33uMuf2g3L6gOfu9UqWI0-Dao7SdIFY86L2jcYLcofjQ75xqJgIzBeH0_KUVa2z6A78IDO77HO5hAkkSYZam3nSCtmgq2oJLGLx0B9i4xMJxRbsFMdY"
        },
        {
              "key": "terrace",
              "label": "terrace",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAi-qjwlhYAKsJHp9SGTJDv9LCaJfTKYSfGMlNNz8_in7les75ZJ9tAWZgzXjBTuMEkMPclHwMpwbuBDREzTin89rMCGl9AcmPCrDdyrSShx455EQ9CuuB9ANUWJlOVBIVGeUgHAnrw_Yce57xVSbrVzH2MaftOqHrbzwBuywXeKSqoNZK1yapMXs0VwfV2LsHDwBCkOz3i3TSNecYaeq3hNoUeSPqKy9qE1fBtgsREu-7xlfN3oPx4"
        },
        {
              "key": "map",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDw1eA4bgTMZ-Os7wxTYHaZ0bljZ4jocO4oDn0vxQ6IjC0X6h_t9Qsdde7QTjc5uGidpode4-AuaXuxiwwb6QucRIim6r8a4LSEsFt6mGCVyjUUqS0MianucUFF3tfnnehexI2XojfnkFQQ3F6SoGlyPm2aOBcyxktZcG8jrKgqbC60KCODzzGUq7mC1iCwUGSbKnMO59XNqxJs9j-jYpo1PIV7H978bHIn2pzXQ6wPQv-ZtZPvOkMT"
        }
  ],
  },
  {
    id: 'restaurant-4',
    name: 'Siam Flavors',
    description: 'Đưa bạn đến những con hẻm rực rỡ ánh đèn neon tại Bangkok, nơi những chảo hủ tiếu nghi ngút khói và hương vị cay nồng quyến rũ.',
    category: 'restaurant',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS0a_OYirtqcuXmLrUEcpqd8Lihs32uCp1zkpxqklnoQZbZ8KUwmXIXnL7nna9VYqGBGUUMOtsrYlVXWV8R7TtkylK7bqdlbIWPZhoAMs6ql7VgmwA0epeNEw-gPlVXEFaQUuVDORIbBSZo0JgLLB5_-WwUzXJJGFyrK8_nqM5HTMDifYqcef3Muup9ytOz1wHhyFxtp3skgpD8Y-5ciSH0xvwpSV5iDeK2PmOFj2CsWrUTWvYQ5Dw',
    component: lazy(() => import('../../Template/restaurant/Restaurant-4/index')),
    schema: schema_restaurant4 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDS0a_OYirtqcuXmLrUEcpqd8Lihs32uCp1zkpxqklnoQZbZ8KUwmXIXnL7nna9VYqGBGUUMOtsrYlVXWV8R7TtkylK7bqdlbIWPZhoAMs6ql7VgmwA0epeNEw-gPlVXEFaQUuVDORIbBSZo0JgLLB5_-WwUzXJJGFyrK8_nqM5HTMDifYqcef3Muup9ytOz1wHhyFxtp3skgpD8Y-5ciSH0xvwpSV5iDeK2PmOFj2CsWrUTWvYQ5Dw"
        },
        {
              "key": "menuFeatured",
              "label": "Ảnh Món Featured",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBN9FAOScXGwvfKR-LyYC2TpIdqlI07ETSMeyCCHxJafLxqgDWQkaB0NojUd0vFvKZlzbU3NOvhzcIhL_9nylLlSAYk4HJReSHMC3i2dMXUhTlpz3uKMAlfFBJW5rKbMNtDbYJnwALft2pAJKqnacN3zoZsZ6D9JCMDouIjWPs1w0iJwfNYzt70mcimuNcR9Bt-PuZc6p2guscoVUyi724NyXiteGr3ZXjEXRf5vj648ccRGBJa7DC0"
        },
        {
              "key": "spaceMain",
              "label": "spaceMain",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqoHk_vU3uSmy_zc9D37501TV38oxz2CI02GV215fN8zhYbPt_unOn55UmHk06aAwgnbTzZHJg7c6f4IhwAfPtkD6VEfnYEysCUNwQyZvXj6UkFM86HrtXN9xhjFUkmaeGhFGr87V4rQkgNJeeC4JvNR48SqT0Vvl8s5pwMR9Bcx5qPdWPhJUACaZ_Fl9IQQHZhRZYm0OWneOTafUCpRd0Fy0VAQ-HWc9_hPvtzeoTRl7UxUHh1IA"
        },
        {
              "key": "spaceWok",
              "label": "spaceWok",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBmQTXOOxLhn43Me4OFiOUrSyUxOBOQNwFbzMQtMc-eNOcLA3unQcNxy4U5lIxbnL3ZTv0oiZ_pdv5f5hDBkNLj73UfgDopdvR6SKW6BRS1S6GKk668JYrgMFsMRIsbs6f51_W3RvefPIsLcNACZD6bBsHBO6Xlrp1MKH07h_lEcTwrziJPOucxKPJ_UYghEQ9jOtVNG5MA0yeAJBnu4yI6ARpkKr6hifURREVotTyg6ZuFzULKNdy6"
        },
        {
              "key": "spaceTea",
              "label": "spaceTea",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuADgGORAhZFqnVnUt8ozs8zTepwCUTfajAnz7YgS5FBjq3Tv71orolusGviz1nq4oiY8XmyPqI0P-zaGQwmLqVxoXNBO0wDh6UIFT_01F7gRu1pK61TR0vUS0pU-uq31xKe661jty6-OYILyaY8LOb5BCFLTXp7oxVG7hQiarGJxz0cZC6tb-OLLePC2_ePFGMs0USnfuRLQFvHU6d6CmSPBqvmw4xyMiVIU72BAKgQCpAtCQi6Z413"
        },
        {
              "key": "spaceDecor",
              "label": "spaceDecor",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBDzd3FIaQufkCIjJYcz0Wkrhe2uCYzytxyIlu9UVDgX8_VleSzZecijyEeHUd4I6kCxw0q1cS5gyMrGERbx-ZPNYu1aJo4VUhnzRJM1bAOszxwDNguastDRfqOjXC7Wgyvk3PSLm_DOUUcFZ21fVswRlRpP9LlK4wvlmo6hsVkIOYSz3A2FD__pf3Y9V8EH0ZRH-dP5mpss6XbXk4deivVq3jORYtf2bIkP1PeY0xx9Jq4ZeSp1FIx"
        },
        {
              "key": "mapImg",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDAvi-rL4Svy8BpwU6OvUVav5B9CQP1GBzSAti161TMxC6gOAOpV0L-gnBYfABwbvjl4Bera7Gcid0Iwqoa168WMIIaL9-tfjP0gZR5WaFHIY0gcte7Hc6B27LNFDzfJLB8yivHY4sHj_-SiH7EYLLHX65z2BweB5tAEkFm6nwVG5T6mjg-3mwtuyGVpobotqHjNlSlj8Gop3ba90vz4mp4Y1deIlknCCwufZb1SlAsvv1_aSPkkHyD"
        }
  ],
  },
  {
    id: 'restaurant-5',
    name: 'Siam Flavors',
    description: 'Nơi nghệ thuật ẩm thực Thái Lan giao thoa với sự thanh tao của không gian hiện đại. Trải nghiệm hương vị tinh hoa được chế tác từ nguyên liệu thuần khiết nhất.',
    category: 'restaurant',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá","Đặt Lịch"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVnViOD58Q78qpSKvZTufwNEOPzBpJijYrH-bmIVOqx0eZ1YOqdrWb_CbuiF_RWfKXN72Vp2S19wwJ7lkujKM00qeTSwHKuj6mte8fZvc26eBTSjMGXEL3JhnbP7XpjP4miZGdNlZ6F5yQ4mVLsx_v2LkMfnUCJdinrH2dggyt6U5kCjQoNLBGSt4JtBfexA9M4ang9LCcPm7nhgaN-Bmac_qB9V9Fo71eWSjQxtfjFCfBiX8mVUeQ',
    component: lazy(() => import('../../Template/restaurant/Restaurant-5/index')),
    schema: schema_restaurant5 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDVnViOD58Q78qpSKvZTufwNEOPzBpJijYrH-bmIVOqx0eZ1YOqdrWb_CbuiF_RWfKXN72Vp2S19wwJ7lkujKM00qeTSwHKuj6mte8fZvc26eBTSjMGXEL3JhnbP7XpjP4miZGdNlZ6F5yQ4mVLsx_v2LkMfnUCJdinrH2dggyt6U5kCjQoNLBGSt4JtBfexA9M4ang9LCcPm7nhgaN-Bmac_qB9V9Fo71eWSjQxtfjFCfBiX8mVUeQ"
        },
        {
              "key": "bentoFlavor",
              "label": "bentoFlavor",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAgrkgBZ8mgq5zYeXg6TjtnK2iSZBap4YpCuXQcrjDfnFFjgjOOPPPxgR3-sFMSIQTYtkdUMeZTEXsyHSIc-XmBa8jRx4dyimkMKsfK8UPmVgDQ5qlZGTYbRonwWlurcvlr7rG7eR8MUNy7Et9EHck5cEPi10ld2Jk8yK-X3JOkFEAkV0N57bRY1VsdpYohMxTNhtg8Cp1l2zimS3PwhqJpFIA6NZkHq0LDal6w9KV3JyZTISdt26xd"
        },
        {
              "key": "bentoSpace",
              "label": "bentoSpace",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCPfUXNc6xy0Er-whdMTCA5VdWFBWvvtbra9lQJEYrSWiQx4YRPgQxD607bR32oZLptR8Jy5t9E-I-kdfnYlBhU2fo02ChHGaJE1TyO_-d-WVytV4tJqqHUEFI0he64BIHJLiU1wvlrDZXA__1uKijk8zyqXmj2M3TU3rkd4d4r1dUCrFAcuOUgl3kQ0n9wOLvkKHtF10MAeLVxCCs-eBlov2S1jw5IaAXKN8MVVtabOmCtzPZG8MVo"
        },
        {
              "key": "menu1",
              "label": "Ảnh Món 1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAn5Ns9MWghtXbIfhIIVWxf0J-cReQ-T7MjXqP5xmolMncWNBTJZbzXrFzbXIi5Vcio1WDRS3DiM9L906TRtEcZGO97T77Arz6rt1pT0yYCRe7n3NiWjlNTIf_0jVMuOFlCCJv6Fq11rDm4VgDLckT_Vy2_ecvuYqwgSxdnvxJuwq5yUllQpMmgzDmTvBUw4sZxq03kHDQdcyczPiFwhOCHgnRplynez8PpLdLTFcWCmC0r2WKzdXdF"
        },
        {
              "key": "menu2",
              "label": "Ảnh Món 2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDUIh8aphtyp99iz3GAW9hkzwzbypDyOuye-JAoL-rUEtQqjb2sPX83uymqXqrJusBzHY5a_BFKkCxrcwvbQS2B7v1OB3BhRFPdTSrawZry96RQ5OlSINU1tGDBAf_kYNf1QJIVg-D3NYdm7mNMOuFBOHuNcZqo56s1Ykd_GvYnQbQU9H78kOJcT3TMbonc2cXdQI2BfCrzA5DAA2BdnWtKx2OlwMRLvcZQCHpnkTOa4PUmKuDpBV8P"
        },
        {
              "key": "menu3",
              "label": "Ảnh Món 3",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDEJwTWshO0mjow4tNZjLSlV7GLg29oAoAiv41zlhZmkWW7G9GvGrOE9IZa3lXyCseoUPoT2IfvyNmsgYGG5ExlFywy2GZWBLGI2jeZ_l2LiiMUxMACjlWTPOLAt5niOFpfgGiwcbwXLcF-ascL9OsTVmntwhVbiNWcIDjr_DfkOxkUMzGeEkPfHvba75pQC0cAiCS4eGqytIfN8T4NWLjzd35bM_S1-KiKfV4HWScfbibjmEHvxhtA"
        },
        {
              "key": "paymentVisa",
              "label": "paymentVisa",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDAtTqmpTxq759gcbRUCdJqxcbPnVA5Dud2swoI6y7ohKMIEToNp9ZDiS0lxD3h-M5YCCW8wWwA-RQnlUDf4t1tJ6qVuSUdnLqZp0c_2UTAEEnjTgtCbltCy-Nj_arAvL8LbyPyVt6KmgdB4bDltrxtunGutfMJCliH4pVlR6gPKYyJChjgKPd1ui_LIDtGfGtFG0Yd0VSBXoT96J0lPfZgKbkjNapcUDTOsNTDT29iAf4GtPKBMqaT"
        },
        {
              "key": "paymentMc",
              "label": "paymentMc",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCDp-knw6fmZPRKaiDRZvOvBDbnHl6BmRI8Db_B4cnFj043FVmP2Abto74bD6fNWaoVmXZbAnaIN35VJM6nmkNuQQVaRbBj8-0E9eQhsZyrT-KzoJ34KXUDddA8gOjrkUb4OafVodHCcHH9tVye3KKX-WLO-2BhNhvEu-28syDxNZbdn_d7pdUcXDOKSZiQf7K00TImHZ4OPyWoQNR5DafpG6eicmKEgdS6m4HIDo-7xllzks5JB-AV"
        }
  ],
  },
  {
    id: 'restaurant-6',
    name: 'Siam Flavors',
    description: 'Trải nghiệm không gian sang trọng với nội thất gỗ Teak chạm khắc thủ công, nơi mỗi món ăn là một tác phẩm nghệ thuật truyền thống.',
    category: 'restaurant',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá","Đặt Lịch"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeTeyoTSBoeRNZi9Z51asYa0n1aRiwNbWC7hbPfBS85JXAncu0W_nYIf-l79kWR8JU7xBO7dagoZo4N6sril7279DzmV8z3iLg6fBhx_SUzv5RsT_eL-7LPDpUMGfjK-j0V9rax2j-TqCsjEK7W8hPnwdcu42VzuVAa_EDdZf-I8cPGXw6FdhDbjjCGwXnQWSYed8ALI-LwmKI5rgW2TWwNVpDZt29_XznbMUuGJaswxFcYGiI7dBL',
    component: lazy(() => import('../../Template/restaurant/Restaurant-6/index')),
    schema: schema_restaurant6 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBeTeyoTSBoeRNZi9Z51asYa0n1aRiwNbWC7hbPfBS85JXAncu0W_nYIf-l79kWR8JU7xBO7dagoZo4N6sril7279DzmV8z3iLg6fBhx_SUzv5RsT_eL-7LPDpUMGfjK-j0V9rax2j-TqCsjEK7W8hPnwdcu42VzuVAa_EDdZf-I8cPGXw6FdhDbjjCGwXnQWSYed8ALI-LwmKI5rgW2TWwNVpDZt29_XznbMUuGJaswxFcYGiI7dBL"
        },
        {
              "key": "cat_0",
              "label": "cat_0",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCQr_JBaXlk2GO6lnVd2t5OVv6JQhSavAkHC0r61rUydOoL2LsLYbriCWU8V_FvaRH-UoiTXpcSxNH--K5IUnmlb0xtWAV8CAxqT-dBpgz8otO-JO5f67wJK_VZb_hc6ze5n8tr6_psdugRWe8VXvvruT6_SB58EGSwaFUTM48GM5vHHW5p2ZCa1mIDQIjKAu1XU3KkdyoSyYZ0q8Ixh1PujczHL6CRpXMLxdXZaoxdA_MQ5MQ01Es2"
        },
        {
              "key": "cat_1",
              "label": "cat_1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDG7DSAQOTU_99xYd3SaTvyVS_lHOCIn8SQdvfxhho2c7c2vKZnGxk-tbTSbBmtLjWrJ8U-D_MkK3ukiu34LxJGtC6E5AlsSAHuRSkjNDwBmURucR_ZGJxtcjApIy08CpYadPYnQBlr2GBGkq7Ro5rJvzWajno4OS63n1W0X0f4oub7j20v4zpmcgEflKPMxLJNDPCf7n0-jZCx6bqVVByCkWG152XGtVsR4X9ll5as54BkqNGONzSN"
        },
        {
              "key": "cat_2",
              "label": "cat_2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuArPrn8yShVGeOOUVLRYM2GGUpQDSLwavgajDA_scBA2q88KuOUcD-fp6gZgcbOIoGALmPg-Y_Xq_9ZfrJeE7XK22FsYaBC1Udt5WV5f4-N7Gy4SBfwFkqTF31829cBMcPf7-1MEtHDVMhXShefOoDTnFi-BRHr_V33B9y8A0jZz77YHrHOK04180VwJHvZZZRG4EAQUwg4DpL0R2cd2d91pOMNsRJ0cjR9SgOzDY2ziLh8u46FAqPp"
        },
        {
              "key": "signature",
              "label": "signature",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuB2nay-m4ZWsa2NFXT4GIcJu21-Ttzn8J0EHO9xY_VKIYEabWk9qAHRBmCIPArQ7nL6lhvR0CjtguZugKMYybTQ73iFCuHubYRuVHCJISEjjVhi6NtYVg6ZlTGV1VCmVFrJTeyc7VS8BxODDUOVRvKpFC34DDhltkorHA-w4-RRRFmdAegv4oTvIYei-7Viknfjm6kwUkLBZHjAt2LjEeygALyQoNqGOmJQYr-j9UVFSTUHT5NQvs9C"
        },
        {
              "key": "chef_0",
              "label": "chef_0",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCwryYFlsvJmpr0rpXZp6iaZYAkqhiXAky0DL7Qs99dwujgv8_gEUwdWH8hcABgXvgh1N3izXyilviLVxT4KdXhdaOyxs0doElkOV-XXo0yexBGnkaM18Mrz12mkOU6eBWeMGEFRefIyX8IaPgM4ewmAwl7cLrDFpAFXSGL4oC9dNJh8RUBzeYPcprof52ULUxgoqlqqnkQojpg9JT5htsKKS_EaLTGVWqkroXFpebfOVLJi1i6cEyY"
        },
        {
              "key": "chef_1",
              "label": "chef_1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBrVOyBxfx7i62BgvgF7GL1uFkVq1mYdM1QkwpEExHDG58yoV-bFe4PlZJ0PNDY2VwBtMhwx3ocJXNfg6SFwg9SxbVB-osYiIFFNrqfRA706adaqAvZlB7GhTs3NCPSX-G7xUKRfMwrOVIh5W6szGowAkkUVKGuX0vKnodMJ-e1pDVvDkNDOfhqucrnuDO1365hyowq1zZ8ZByqmpUbvfQOpYa52m46tmZs97YporDqPp4EQYw2Qjb6"
        },
        {
              "key": "chef_2",
              "label": "chef_2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC6DW1Evoocaf5Tbk_Iuz_YtZ_N8ZnCfEuVrpCqBx3n0TI7NERM9OJdYtdAdvNAcSEcgQHP6XUkmfGhI2iyLJa2R7axhmLaLeIHzjmPiR9NnDfaOb2Xs8icq8ZYsdhKX_2xbW3mUMM0ClDkOsOsm7xbYrPnO860n8AeKmesqEFbApvotiRUOtGAzqjBq_HBDV9uJDU_k6UoA7e4VsD5a2urufpnvy8bD02CZ88MK4eAZhXMk1rg5VM-"
        },
        {
              "key": "map",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAzhEQ7ib6nvs8r57oKwWa6vbLA0NStGz5Wd1cqEKd6FDaj0oX6W97OZrNLp2RyXtluqrX7Ie9yfDXSybqf2x5s1PrNAhiNviS0ZDhDmYoOnzcy96FvCdd9YYRRaGe7pEK9EwzCKFFxR8YOF7FeTeOEnCw3SV4K8J2_T8DcT6e93ji9_2b8P9Uq26zfLRpuQjmnGq-WqMR64K8QqzASESWZZ8MC0C6zn7Adxai-5J-_smdvHw_BJikO"
        }
  ],
  },
  {
    id: 'restaurant-7',
    name: 'Crimson Sushi',
    description: 'Mỗi miếng sushi tại Crimson là một tác phẩm điêu khắc tinh vi, nơi sự tươi ngon của đại dương hòa quyện cùng kỹ thuật bậc thầy của các nghệ nhân.',
    category: 'restaurant',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá"],
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLvWGLzS4GDNPNs6dtEzfgiEs2NLzqNcAm2-St4v1GXWLoNVEfZFNi6kmeMxOy83S_jlLOdaqOkfkJOkEmu919gm3YQXfqv1Sgm1xv0IhA5Ke_Hx6M4Bi9Qm25HAuZ_34SnpQ6fU4hVUvMI3T36GoBL82qjMxYGoytkEYcKfFQjnK1pJOPJIwtOuKykL7d5EmHe4SV5PBnJHQIk5LPXxK4WzdWQXue0tia-vTPsbxG0qTzfddtdk0-wI_A',
    component: lazy(() => import('../../Template/restaurant/Restaurant-7/index')),
    schema: schema_restaurant7 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "hero",
              "label": "Ảnh Hero",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLvWGLzS4GDNPNs6dtEzfgiEs2NLzqNcAm2-St4v1GXWLoNVEfZFNi6kmeMxOy83S_jlLOdaqOkfkJOkEmu919gm3YQXfqv1Sgm1xv0IhA5Ke_Hx6M4Bi9Qm25HAuZ_34SnpQ6fU4hVUvMI3T36GoBL82qjMxYGoytkEYcKfFQjnK1pJOPJIwtOuKykL7d5EmHe4SV5PBnJHQIk5LPXxK4WzdWQXue0tia-vTPsbxG0qTzfddtdk0-wI_A"
        },
        {
              "key": "story",
              "label": "story",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLsk1-akQjPqvE_eK92bQiR4DflPO8rjkzLPWw2LcmOVhYtPDClh2rXkvhhk29X0aPMBoPuvsAxBbYdOjXSsTWXsJxwtxziK6bMiInWyS_cdjKohapRreKfRn2pqviKIDJUR_fB8l3N4By503vZsO3fPlwWIB_BqBNUgrK72F5tUP-1SlKOY6C-qW6JAqgV5-YYTaBZry16MSTcNzP7uGFf-JHG6GCMmlc1kKE-Wm7fWgsc3cobg2UyNVQI"
        },
        {
              "key": "menuHighlight",
              "label": "Ảnh Món Highlight",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDVZD_g73ewOx_veijkevHIA-X-Ghl9_ydaJHgQHA8M_c5RAvpf9E1QGTmvsYQ0grr7M1cfTQip5-TWYF3fnRO4PrgKNv0IrN9k1wG_orwx07SmJDvGShcBULZKjwON3_QP03O_aW2ghnUjx3GMthxR65BWXKwqXlQQxy-Yz_hVc57TMaL2nllQgeLJUv1f-VYS8Qjvll-3EDz9viz2jcsPpeATQoAxMJ2qHA_oQtTQgj79Ttab3Fgu"
        },
        {
              "key": "mapFallback",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBfjB3kVuTfnV8-5iyqYjZPXqSXnyXaMYmWmtT1oKmzcad4wMQhPqTKuFvWNMNtfVx2o22Z_dQQBXEkzgy84ZqTIAkkiaiZd-Wb8Awl-jzMkqA-jps3y-Li-qrDUa74rQije-1kDuXhUQvab0QUPMxtzz99x3jqR3V0hOuJuNjN0_2YwHKbFUR-AgR8_5rIhfr8qawuBXIL-tshoBR3Y0NyHpsHD6jei1bTwGRsum2F4NU9Gx_C5mnk"
        }
  ],
  },
];
