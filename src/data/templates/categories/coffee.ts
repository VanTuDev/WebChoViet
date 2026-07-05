/**
 * Category: coffee — xem src/data/Template/coffee/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_coffe1 from '../../Template/coffee/Coffe-1/i18n/vi.json';
import schema_coffe2 from '../../Template/coffee/Coffe-2/i18n/vi.json';
import schema_coffe3 from '../../Template/coffee/Coffe-3/i18n/vi.json';
import schema_coffe4 from '../../Template/coffee/Coffe-4/i18n/vi.json';
import schema_coffe5 from '../../Template/coffee/Coffe-5/i18n/vi.json';
import schema_coffe6 from '../../Template/coffee/Coffe-6/i18n/vi.json';
import schema_coffee7 from '../../Template/coffee/Coffe-7/i18n/vi.json';
import schema_coffee8 from '../../Template/coffee/Coffe-8/i18n/vi.json';

export const COFFEE_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'coffe-1',
    name: 'Garden Oasis',
    description: 'Phong cách vườn xanh mộc mạc. Tông oasis-green #2E4E3F và gỗ ấm áp dành cho quán cà phê sân vườn, trà đạo. Kèm hero glass-panel, gallery bento 4 ảnh và thực đơn Signature đặc sắc.',
    category: 'coffee',
    price: 0,
    priceText: 'Miễn phí',
    tags: ['Sân Vườn', 'Signature Menu', 'Gallery Bento'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkqsQSsTeYHw1cnpeU4Uf8MH_blw-Fu7MpPh180Fi0B0ENa0grGwofz2i4Kx6-FbVrIAnE1ehmWhby5zlEGg4KI36Q6WrJoHaey7gbVBPY9dRIdT93aw_bKShcmlj3SnS8Opb797Fztt-vD1VVZUJs6kyb7idreLbbqq1czNPDN0Zp7jG91PZTCGE8r0PCllLuPuPPXOfMFrazJZyBMP6b61VbyI29Jw0ch2DFXnJW0vFekGId5arfP0JDJ7-WsaR0dS3_3QGKuU',
    component: lazy(() => import('../../Template/coffee/Coffe-1/index')),
    schema: schema_coffe1 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroBg',      label: 'Ảnh nền Hero',    defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkqsQSsTeYHw1cnpeU4Uf8MH_blw-Fu7MpPh180Fi0B0ENa0grGwofz2i4Kx6-FbVrIAnE1ehmWhby5zlEGg4KI36Q6WrJoHaey7gbVBPY9dRIdT93aw_bKShcmlj3SnS8Opb797Fztt-vD1VVZUJs6kyb7idreLbbqq1czNPDN0Zp7jG91PZTCGE8r0PCllLuPuPPXOfMFrazJZyBMP6b61VbyI29Jw0ch2DFXnJW0vFekGId5arfP0JDJ7-WsaR0dS3_3QGKuU' },
      { key: 'heroMain',    label: 'Ảnh chính Hero',  defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT1T29AWcpkBPubUTqh6dQGDlTVcUUDzLh_rT6_Z0HEDmdw-xPPTbGLDLCi0i3T_N88Yr8ARxjaX6DeEkTNNLpi87unSdAk5eKxlYEet0KO_OiFzgU1b240fnl4vdoFqEHwv_aUBXqg2-Lqp5H6ELolMgEVwvKUx6KpH1gwsStcyd2n85g7xbj45pczLxn0KfVvytlxUrNznItnfjdW9jl3BZCKdd7FJs9mK8WHuOAEzVu2sKxwAEcDCYVkNx0RnUgjgFlXAwTAc4' },
      { key: 'drink1',      label: 'Đồ uống 1',       defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhYysaf6Dsi-b4xGx0Gtp8JwHEChXeSlG2mCJcij7XHEIgCM_OZKUyd4qEDZegSq3kWtwcUo7giUXtyZUxzQifiBX8RZMBOIxtPR2GgaZzkh23IxX0AOuWw-ilfnmzEFHiefiOSQVenrFM8TByZ7PO9ouVxt5olp-VoPmcOQsw1bb-KJ41_uUczIeiFiVF2QN76CG5G99RW5HT6eg-hHjqGXyAPFjBCsjH3XzUQuEJHvHY4P8qBUAhhpEXNVQX4Pxp0k9GW_6QBC4' },
      { key: 'drink2',      label: 'Đồ uống 2',       defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6IUgUjzgxFhoHjDdt6ZKZY2czsmyVVqBplHpHeJVipWBXYyNun8B-4P7UHCDDxlk8RorgFeqBqiDiPkQdjPMDYyEKyi7b7ihNvPpdkDvWilEqegwJ4tB6uKVfFI7DYcUP4Ls_xC3xMLSBpxU93VnhU3oaCqqOwxXB-iU_uwre9is_PMPOmVIX0cHJ99w-RdMSPz4b3QsEWMCyz2bqc47r7BdVYzHtPWxud0PYLO-lwz8Mnn-51NVBfnJpzD5uPObk3FVDybql3fA' },
      { key: 'drink3',      label: 'Đồ uống 3',       defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUk7HVg9JWjogGyybbLroGhwuDm8g8sSvoPhkMJBo0d8kVma61lYwf2yJfBcVvM6Kbzmor2NWimy7x6LwIcyA7dconhnn9sAy11MNRskv8RnSmvrHocX2yF_VrVD7GOkKGxGAsCPPoIICWh3AA0xGPp6j8mvGMeqrkST3q0o1DdU2zCUMRSako6n17nHpLBaLwc3sEytz8OoGeIfBb94aWC7YweW9KqlytD2uN4J-W2J-DOyJN-fRcsEbk5E8rwQDi6WjIsaoU5eg' },
      { key: 'galleryMain', label: 'Gallery chính',   defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiwCA6-9Nm7Vr8Y4arkvk5aV-3YguTyuqhKXeJbulipcwAXaWA87XlsZ8QpcbiMhCgBWtBHfQEX81syQkxjC4yuu46VYG4aGUC-xKHHNf33UsANIuEJj5Pq6INdysrhjvPNE1LOhdKzUGDpQV2DviLnaCSRYxVp64f2uD8pNPQ9MfPPpVfuqoKZdpZZ_rHXvkTE0AkPr5S2V1zU46uru7kLyHWuNflBiH_67SlxgX0f2av5RHoqMzxX6maxY6A0OQlhgKq41_59gA' },
      { key: 'gallery2',    label: 'Gallery 2',       defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQ2UP4nOD8HiXXgNFXajISfeCloB6FQgunov0MHp-J-WbuuBfvHY1b8meE-rk-AFB9C4GjLCfCAQzkQChjBVtx-g4aFMvMVQiN86ymbHW1VTV_kbGq_u3jUD12fYjGZTMjNIZrG3Wt2c2aGXKnapbSXeAqgmCaI_j7Xzw4lIrYaOzG73_fyen7eKlI83o7MO40MH9brUH7NXAEKl4tAvUU5j56kBobuu8YoHXIn1JpYZorcMpR6x-x5qA8DTus1YpyWN9we-J5A0' },
      { key: 'gallery3',    label: 'Gallery 3',       defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQFfDbVSGSbbBBZkj4l3cPXiZH_yJssczjPgSZG5o1Yj5b9noIpmuA8xD6T4rJsaWk_qSXNXpv_453CnXn8_Ozn80ACzZ7CrI7NMF2ZlZG3pxsDf4CQv1SY4mJTTskkKtgE3uHGG4XPn4Zuce1m8_70k6pKm5BzTRXjpzTwqlC7XsJ_rEJzbT7MHF6PP0i89iKB2QaLrbgZ4jpeocc2FX53iG8' },
      { key: 'gallery4',    label: 'Gallery 4',       defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhbuGZT_G_jOWqSCejeZLkTx2yGWMfDaZ0FEdL3I29eQMfPSX0OT-WRQDyoe9NmVYtiVZeWo_koSjeumPuuxcvCx1VZr6dHXn3Nmmi3ftT3QYssLVoE0IKxHkdW09yF5XSdZRBeQdpvWVaszMgniCKHPXuowTUYGBYiAfXRE8i0F36aF5_RG3YjGdfe54ZPRYl33G9kIaXh2JWG5HMOYCYOzYrCqHY3KrmTMgdNSe2aKuQudzQY_IYHkbu-prc1GiXkNKFLpMu2RY' },
    ],
  },

  {
    id: 'coffe-2',
    name: 'Tropical Chill',
    description: 'Không khí nhiệt đới tươi mát với hero slider 2 slides, menu tabs 3 loại (Signature / Coffee / Tea), section không gian amenities và FAB giỏ hàng. Trẻ trung, hiện đại.',
    category: 'coffee',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ['Hero Slider', 'Menu Tabs', 'FAB Cart'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdLMqjDGSjcg9BNtGMqRZs5DzFzQrtcKw8TgfospemgnfRbUn1awWdCRd2cHi80P4mvgR0vaq7iAAW6AXtYJiqnfAAbqcE6IC84PSdAQEsttEdQl44ckbleKo33pGgJHArDqwfrwk-9XRQRY9ivQHo4aTURIRMhSAic7AADLHIUrp9cMiOR7_-pioCDczuz8OgcUKN3a7EIEO4TBEzLMyz7PXK7xP84w_XqyR0UlWSQxuJHo-7DSh4CD332h8NTGZZKfEobgQy2oc',
    component: lazy(() => import('../../Template/coffee/Coffe-2/index')),
    schema: schema_coffe2 as Record<string, unknown>,
    imageSlots: [
      { key: 'slide_0',   label: 'Slide 1',        defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdLMqjDGSjcg9BNtGMqRZs5DzFzQrtcKw8TgfospemgnfRbUn1awWdCRd2cHi80P4mvgR0vaq7iAAW6AXtYJiqnfAAbqcE6IC84PSdAQEsttEdQl44ckbleKo33pGgJHArDqwfrwk-9XRQRY9ivQHo4aTURIRMhSAic7AADLHIUrp9cMiOR7_-pioCDczuz8OgcUKN3a7EIEO4TBEzLMyz7PXK7xP84w_XqyR0UlWSQxuJHo-7DSh4CD332h8NTGZZKfEobgQy2oc' },
      { key: 'slide_1',   label: 'Slide 2',        defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEL4exsTFkxdGfFnYI6OPBu7RQhY6XDy4-MleOU-jMeLix6_ZYGgAnnhTat7wiHreeb5kgwcl04_N7gvOh8cwjxOSrW5iWJMPeTUBbjzw7BMkhczJsyjX9bwahsnGtdoHDwFvwZHoLpD3qKTbuN4Q9KT1A6eMt4IZhDd4_t06xj6etcl1JfWe62tfmDZEVAbESqR86WIKZH334xn0FX8ILOFiUg8ZBJpcKsP2nX1SuSmxUgxwcbd7T9XJ1X5D_XM0JdtghoKi8yWg' },
      { key: 'avatar_0',  label: 'Avatar khách 1', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyluc5rhJPBPrNhYCLLFC7FIvZhGhfChP_1kPBpzxayKir2zIxr1-PElv1FxgM6IWfjZanl-49znLWUrcIGJoGwqN6xVU7-x5-r7Vb3juDFmafLOgaWc4O4i3S-naIu9JV7C9b-Fw2MqwgLnmfCz5X6bQNeD7SX5ipQLALVM5SOBbbqmiemQ4TtqyznMYZdUpoi-97sG9HPRxszS9Ljb8yc0lqXRNHgZwT6TQRrdzceoSV2HPsRYRpwF3yCOAgGTEgfHBrbpJpO0Y' },
      { key: 'avatar_1',  label: 'Avatar khách 2', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnAQry9HFK-ecJVcL9_kCL39ztrOI_NPUAIx1WlEsgt48fuFEzwyiX1BDvIPNccCOK_Kk2pfYSuz-7HaQ7meN5MEnKMvAbxSi_1Ndz6WP4N1vNHnI74O4v6BW-VSgcOtmFF4zY63YJLieNGuIwK3emcg8BjIvzDBhYz_7UOSFn9GXpeo4KBCtsIogZg6jhhg4jD_Nkn1LtnQr0nSRuJHKbbmd1pBeN4YmKXPY9giLecrpiKCDcJjEUJhKR_s2WBt3Ob4B5WRXQQ4Q' },
      { key: 'avatar_2',  label: 'Avatar khách 3', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD0_aKD4u0q8exAjJm-pKJNiUGe_yZaArAWss8N_i70Ia_G5qxc8mfnBoXZQgApHMwgkJjfdwn4NuXVm2k5YaFL5b-Hz9N041wpDnT-psHv-Bo19XLT9ohMnbA-FjF_4BRrSPOfKfZOkEjGHfPNTrgHVqXHNcJIFw1oIoO1-lYEO5xFG03kn1Ihnt1qhg1m9G9BV1GwolVswlWFMfifOrEjVx3B2xQl08nsGt13CFInDu3FD3pDElDce-Bx0I3lN1VK6-khaQ13-4' },
      { key: 'map',       label: 'Bản đồ',         defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBktsMp5r2HBD_yrSARsoytd_YLBAW6osqvP_5nKZMKwTsWg2YfpbfKTEC_rXZXdJW1FME7MLZ1vfzav33Ri-8UoiK1quVVkUAtcr-t4Y_HdspYbAkvS-IKp1mhNsfWJy4fTLYAX-8zC9xTRC_16_2IK1SopXufZKXEK-kTruD15RMAZaeWg8YBQ7kSi0O-SQFY5aLTdEmgE-iR-W1QKjAcWUZ6t7uiyTHOZnsLCcSAVtK252-AkA6lmPvWWfxtywl7SKMjSsTi34g' },
      { key: 'space',     label: 'Không gian',     defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuAuDQu1q9ySPWpcewoJ0KbwPt4ZuMjj10ehn-d0Q4jNiKYU7dLY9kgyCtlslk4xgms6ZGNN7GBcVIAnT02rQPTXJ9Vwfxcyfmy6klcWx5QmAC8IBSZgYtCxwil739UPNsziwmBAXetEAxICOGSTiThDRen8OrlFk6kOyVcZGbgysORStU3DJl86af9vkgFXvrmxSLun0CVY3CGiYy1zW9kYRdtyXyLW4J4P5HKDxUaCQhX2HUu-MuZuLLopBaE7RDw7Z6Qa1h_zc' },
    ],
  },

  {
    id: 'coffe-3',
    name: 'The Ocean Cafe',
    description: 'Phong cách biển cả thanh lịch. 3 danh mục menu đầy đủ (Cà phê / Trà / Bánh ngọt), gallery bento 4 ảnh, testimonials với đánh giá sao và khu vực liên hệ bản đồ.',
    category: 'coffee',
    price: 499000,
    priceText: '499,000đ',
    badge: 'BÁN CHẠY',
    rating: 4.9,
    tags: ['3 Menu Tab', 'Gallery Bento', 'Đánh Giá Sao'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaIGKuFpa2TTNgzB0NYKf_gM_H-BGiTv-TdhklJBmJ2sXnSHeT3_cA_gztVBTb91bIG9KqhB7Y62KA4ZXx01hqQSw9JrpL0dQ4MTW1Gm38v2HaABOHfLDE9bEsy4uSlkfQBDDs4dJlu5ZrSCMZyLUWxQWrjnSNgkwi2R7WEAqCmOBHfsrNoYqLgCU2XIxTe3Ua5Xj4PZnOEj7gDrw9wzK9FG2TCP8-mxsJXyJVdffTwPbcaQ_6EZK7EU1tbf3kSQuY_Xop9jPlHVs',
    component: lazy(() => import('../../Template/coffee/Coffe-3/index')),
    schema: schema_coffe3 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',      label: 'Ảnh Hero',   defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaIGKuFpa2TTNgzB0NYKf_gM_H-BGiTv-TdhklJBmJ2sXnSHeT3_cA_gztVBTb91bIG9KqhB7Y62KA4ZXx01hqQSw9JrpL0dQ4MTW1Gm38v2HaABOHfLDE9bEsy4uSlkfQBDDs4dJlu5ZrSCMZyLUWxQWrjnSNgkwi2R7WEAqCmOBHfsrNoYqLgCU2XIxTe3Ua5Xj4PZnOEj7gDrw9wzK9FG2TCP8-mxsJXyJVdffTwPbcaQ_6EZK7EU1tbf3kSQuY_Xop9jPlHVs' },
      { key: 'coffee_0',  label: 'Coffee 1',   defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-63Lw3K3eym8gOyhSjOo4gyyKtRkCo2XRdgGhxZ8bEN8NKz1C-mRoXFq_-t0DtuIP0eya0am2ArVqhcHkKE_-DG2hdBkroLi3sJRN7C-VxTwlXPPJSEvmW6NksDkBoT8ZzHRbdiUpWHIR3BCyCMW7uGA0IuwamFNHyD2OBA70AUJQA7xeBN9EYgjST26amPoBWgQGCV2rB6rIT1tw-uJt4bmNhB2_y9abcfITFJE1jjpWxCGyR5fOBuCAYTQTKHnVUIEwqvAACIM' },
      { key: 'coffee_1',  label: 'Coffee 2',   defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeepJ6yNlHQrKeY4B0Ucby3Fpwi9ZHE19mpAZ91WBQwcBRgr7i9RyeYcpzAVeFohEzQ88ND0JNzV78Oyy3qzov3oBjnMedF18rC2kRBK1_KNLHnsB-FFxsr2YSPcAxcW-MvRZIofb8QmFNvnoCRBC3r8GBX2YfP9wvJlPaulIM2GkJc7gvPLAWxnokP8eHnJkY-y3VkHl21LfW0jwzgLiLR8o_dctVMcVRjuxCQYDLyd8N5-8DJBDAMGYsiESVr4Th55N0LoXrJSk' },
      { key: 'coffee_2',  label: 'Coffee 3',   defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyL5zw-799eVfVL1zPfD6MBGHTDL7xvQmkgjFIJ_cavb3MXpvVlrztKAvIlupss9k5ObF_GlN6db2ZgE4BhBu1K8lkTM1NvY8mQtaKmHbBvG5YpPFVtAUJRGwbSnL0PX2QZvRMIsbsIO3Qh76qxbHdfUVz1YYiupMwq1t7fCvc8cCTcKyDE6-JxIDci-AfiliiRRr4ph1cPiyEWNsOS0PrfYmrmz6bIOsCBnzvGweqXZe53Yh2Khh2c1gWV-GMeAEqGhSotfFW_9s' },
      { key: 'coffee_3',  label: 'Coffee 4',   defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtaOKhyhwfyXPLT1f62NuDjAGV2t5_KNOjPOLUUUGh2djM6ruXa8ZByhMjk3f4_4SrPxkignFtkL8ZajkYQX5qCoChsMSYjOWF158GUlXwodeM8-_A092ez41ACsOrP3zM0iMBwC0eX6FBoazpHLYuXGe7X74HNgrCn143sUifpi37sKO0ND-hLS3UV954MQu56z6bJaEHwEE2yGjhwSI-z5Cr8qx47GeZlWlLqQeRkbq-_KdDLUo-JdgRHaI2smIG_L4w9TU4bOo' },
      { key: 'gallery_0', label: 'Gallery 1',  defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnsgRWnILkA2bmaF3y1od56BBVaG4hwAYnvGsNsND4iMuGR8g2XQjnRkdBObc7OvLAQqRQrkLPsRnudzQ2bK4pIVhjGuYr0n9Iye1pn0dJ2E5RcFfjqOuAo5VzDzSwXKbtl5ZewuTq-RewtmqPf6uGB7sS1orW65YG06pe0MYaRZc-F5nX1eGZSUy4Lntn-hf2GcblAfxIStEU-5H1sJOnhvj5wXC4caifokNpZI4EHKd8NY3wXLPXuXjAcS1INYM8Bw8uea0h_As' },
      { key: 'gallery_1', label: 'Gallery 2',  defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZdy6mOGTrEgpW2zSP6ryn5ntzMIie5A9C_TzOEt1klZwu47EpO2xjyQkPDpq60zrRp8I-oLS8pgUOAW9HNZEkkuFZ9DzHd77AMexuBv9t8sl5tHafxzn0a2JpdAy2kJZldjzhlGMVstIvpRz1k2tvYQVmnZJoHh2EORJmuZMff5Qr0hgI_TwW7v08kqoYuUcpgoUgEkkdHGtqgv9uS7n626wdfU4tb8qg99FTaYBQ7fidGWtKbhtVyx-_K2l6GA3uIG5NXoUh-LM' },
      { key: 'gallery_2', label: 'Gallery 3',  defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnvjmE8r_CqRB-MpP158vGnXsGRyBuezDJNGTS8r0jQ_83aG5tKwBuBF7H2KpM07njVIW2xktQthwefCD01f9MDV2WXTV8b6jYzO4TvS99p4XpbdiF6zuI1T7p0KaeXzeQbqteIw0Oy4xf5eXuGfJwZNghKYn4hvUVWX9GJb2PExJTIGSaf3QuzftbhbYo-Z959xvQSqnfXJaNRp-vmI9jvAZfBV-TpGVKJK1zI-_B0QssXJTzyjrlcmvPpwHaOxQmhbNstsn_6MM' },
    ],
  },

  {
    id: 'coffe-4',
    name: 'Koi Garden',
    description: 'Sang trọng với tông xanh rừng Forest Green đặc trưng. Gallery koi pond hoành tráng, menu 4 tabs (Signature / Cà Phê / Trà / Bánh), testimonials nền tối elegant và contact panel map.',
    category: 'coffee',
    price: 399000,
    priceText: '399,000đ',
    tags: ['Sân Vườn Cao Cấp', 'Gallery Koi', 'Menu 4 Tabs'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvOIF5qB7g9yZ4YveEApHT-KvLuMUaVfyLB5s69wLPgmUs6DPWxmSJNRFVfhwy0R7PyJdWqXv4istAS6Uat-s4glWXsRCHWD7yoNCtgNn6nsYHmvFKqb9GMnEELlB6-65nUFR_vaqO0EcagdW0VguzgxTGgPj7iO0pg__n-lomMnSbuGrJD_S4nOF1_ZzXgiFcBCupxPE-10YOhPSoWOVs-kh2q1mE-IzTsC1JMe_9gSe3sgukxi2tQwEe49IoktE5AI0ip6DfoWo',
    component: lazy(() => import('../../Template/coffee/Coffe-4/index')),
    schema: schema_coffe4 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',          label: 'Ảnh Hero',           defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvOIF5qB7g9yZ4YveEApHT-KvLuMUaVfyLB5s69wLPgmUs6DPWxmSJNRFVfhwy0R7PyJdWqXv4istAS6Uat-s4glWXsRCHWD7yoNCtgNn6nsYHmvFKqb9GMnEELlB6-65nUFR_vaqO0EcagdW0VguzgxTGgPj7iO0pg__n-lomMnSbuGrJD_S4nOF1_ZzXgiFcBCupxPE-10YOhPSoWOVs-kh2q1mE-IzTsC1JMe_9gSe3sgukxi2tQwEe49IoktE5AI0ip6DfoWo' },
      { key: 'gallery_0',     label: 'Gallery 1',          defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtfPhYN6u9FvRpWnZStGS-Yj69iaO2j8bipquiIRwISf6gLNHoJjtZ6-BB7-w2-hljb5qG_oLfFcDqOmgGamgRbYENycyT9zFVfvXtAAk03c7tOeKjdXFv-xjJh8G9rgVJg5JYj48arU5Lz1Ia91NJeI7sfT3U0GDPYtRVcCue-qg1pcI9tvyZcg2XErJC2a2Ej4dvNguKLXGpy5KKZz0sxXU_9SeOjtm3oQXdfM_5Y-rOHJCfeFSkq09P4GrQFsISpr-8W-jMa6E' },
      { key: 'gallery_1',     label: 'Gallery 2',          defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIGcn1jRxOktrRWFwuc5IHaMycaIkFLNXCAF08QMx6p0t0WrlOMgcDd1oUwF10RfCbc6szV5p-YZ4QQ5lvsbr5GZmjDxlW02O1F5E3AJJKdt1Jvl3R_TLSdqblb72AxqxK2nsnn1tjw102jnmJfWvvCQ4nqKMTVkQ-AUMxeIRJ509rThMBNoZJd6bf0-cChSmxaNkVZ55fMkBub6oe9o7UD86orh1ZPFk0K_YtazmrSMibueU9kHCQctjXVsEHRA45Lc9WAgXp9Pw' },
      { key: 'gallery_2',     label: 'Gallery 3',          defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmsu5GWyRbjQkz-HlIqnbx08vGZm2QzlAS1WLCoQ9Kam8xzo9SAIjJWHQ1hJ5Xrk1b7gHd0lJANdlQ0Ck0JouUsW8KaKcqUcEAjEHR0Ifhl9WV3S81dRodO_11zXpK5ukRnLRWBcYUKxrLJoJ8NKUaADSMa09y08OFKGwU0_KdmMxZqXAwoP6w6yqPnemi3slEX1vO7nAPsCfD9GQWABnyuTqdm851IJQ8UhBARtnogpNQfcfCwAJV2gp0XgkN0Rc3h6iLdJPeyiE' },
      { key: 'testimonial_0', label: 'Avatar đánh giá 1',  defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJo_oo0kjTqRdFUfzLBr_dXSrTcEDS9eCiwVvCDq5YDBio50y6Gi27nBclPtxzp0B3wZzpuqiz-rwF5YNy-46SShMcQDcaCm4LA8f1tO9m_DntCFTiF6DHywYnAnpySXA1VhXvukKM0ZMZ8ndrKfg40dY6UORrEjtxM2GUODf72MoqpLHvMPWk5E_xGEyM2sZdjh0OYS1K4GpPs0OwTf-CPRw6YjgF-TbmF4cYiOfVBJanBDLFfvoNwBB2FSbf30Ce9OHAdH2rQ8' },
      { key: 'testimonial_1', label: 'Avatar đánh giá 2',  defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5admmej1kz73vL6kcRXf9JLDObhaH-iKXYUh3slmDq1SY5iQy7SHee19a2x8gagG-hFLdgx6xwRQx3DPX32fVAcI-IvjO7ocKntzm3fr4mxryJjRikp9wG9UBzXDJXQa4Vp_ZKv4IJDqeevmZYNjjaBmIo0Ntsr0nheplQgUPUz5o_LyaFBNJv3Jtm5JbO4CRfq06dVTABOuptBRN8lOmTLBl7tWOThyMvxzoI-PbBhtmxAQNN62iGje8YHFYE1xs-LGlx5ushKM' },
      { key: 'testimonial_2', label: 'Avatar đánh giá 3',  defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYm4xssX6LbpKL90qi3C53prGiwa6toROKyFmWs7_LJUa0DAuEbKjAkslENhyd0K6Fg2rEF0Ug5vD8zWiaFkWHxGr0IOlgOwl82Gkm5cKLbiedHLHC6jedB6rIO9otaW-QrIkwwThu3HbqxjqUdJxhkJHjHluMtF97AXvX1ZrAnsj0g0giQo8uorA3AyoJhKUWoMZ1y3yV3ZaGWk7fbDuTC67LMdopyGZrzdpcsf-137_09P0uV0hP973p-lxjVOS7lptX1pq7LTE' },
      { key: 'map',           label: 'Bản đồ',             defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM5nLP9FCaASSJXsC23E01Q9z8694iAzzNLxRluVRwoT80lrLqYrtfzRiu1xT0_BzeG_qgrMLs1PYy-msnaRewk-ec7tLelo3HygNaBb4JH92jmcAvbbR5W9yKQgu9blHNtgwsBrwLGa1Q0qzYmqmKpnbQg4QNk4vChQuEz7g8485WlSYRSxJjRlIiA3-tjE4HZBGrU4pP6hUV_TelC9IjdRSiEYMJMP0aEJy7_bRRtJ4viKGb7BCddWvW70R4tdW8-WTjpANilFE' },
    ],
  },

  {
    id: 'coffe-5',
    name: 'Mật Ngọt Tea',
    description: 'Thiết kế ấm vàng amber cho tiệm trà sữa thủ công. Carousel 10 sản phẩm cuộn ngang, gallery bento bắt mắt, footer newsletter đặc trưng và contact panel bg-primary sang trọng.',
    category: 'coffee',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Trà Sữa', 'Menu Carousel', 'Newsletter'],
    imageUrl: 'https://20sfvn.com/wp-content/uploads/2022/08/thiet-ke-quan-tra-sua.jpeg',
    component: lazy(() => import('../../Template/coffee/Coffe-5/index')),
    schema: schema_coffe5 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',      label: 'Ảnh Hero',           defaultUrl: 'https://20sfvn.com/wp-content/uploads/2022/08/thiet-ke-quan-tra-sua.jpeg' },
      { key: 'gallery_0', label: 'Gallery 1',          defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBktsMp5r2HBD_yrSARsoytd_YLBAW6osqvP_5nKZMKwTsWg2YfpbfKTEC_rXZXdJW1FME7MLZ1vfzav33Ri-8UoiK1quVVkUAtcr-t4Y_HdspYbAkvS-IKp1mhNsfWJy4fTLYAX-8zC9xTRC_16_2IK1SopXufZKXEK-kTruD15RMAZaeWg8YBQ7kSi0O-SQFY5aLTdEmgE-iR-W1QKjAcWUZ6t7uiyTHOZnsLCcSAVtK252-AkA6lmPvWWfxtywl7SKMjSsTi34g' },
      { key: 'gallery_1', label: 'Gallery 2',          defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyluc5rhJPBPrNhYCLLFC7FIvZhGhfChP_1kPBpzxayKir2zIxr1-PElv1FxgM6IWfjZanl-49znLWUrcIGJoGwqN6xVU7-x5-r7Vb3juDFmafLOgaWc4O4i3S-naIu9JV7C9b-Fw2MqwgLnmfCz5X6bQNeD7SX5ipQLALVM5SOBbbqmiemQ4TtqyznMYZdUpoi-97sG9HPRxszS9Ljb8yc0lqXRNHgZwT6TQRrdzceoSV2HPsRYRpwF3yCOAgGTEgfHBrbpJpO0Y' },
      { key: 'gallery_2', label: 'Gallery 3',          defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnAQry9HFK-ecJVcL9_kCL39ztrOI_NPUAIx1WlEsgt48fuFEzwyiX1BDvIPNccCOK_Kk2pfYSuz-7HaQ7meN5MEnKMvAbxSi_1Ndz6WP4N1vNHnI74O4v6BW-VSgcOtmFF4zY63YJLieNGuIwK3emcg8BjIvzDBhYz_7UOSFn9GXpeo4KBCtsIogZg6jhhg4jD_Nkn1LtnQr0nSRuJHKbbmd1pBeN4YmKXPY9giLecrpiKCDcJjEUJhKR_s2WBt3Ob4B5WRXQQ4Q' },
      { key: 'gallery_3', label: 'Gallery 4',          defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvOIF5qB7g9yZ4YveEApHT-KvLuMUaVfyLB5s69wLPgmUs6DPWxmSJNRFVfhwy0R7PyJdWqXv4istAS6Uat-s4glWXsRCHWD7yoNCtgNn6nsYHmvFKqb9GMnEELlB6-65nUFR_vaqO0EcagdW0VguzgxTGgPj7iO0pg__n-lomMnSbuGrJD_S4nOF1_ZzXgiFcBCupxPE-10YOhPSoWOVs-kh2q1mE-IzTsC1JMe_9gSe3sgukxi2tQwEe49IoktE5AI0ip6DfoWo' },
      { key: 'gallery_4', label: 'Gallery 5',          defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD0_aKD4u0q8exAjJm-pKJNiUGe_yZaArAWss8N_i70Ia_G5qxc8mfnBoXZQgApHMwgkJjfdwn4NuXVm2k5YaFL5b-Hz9N041wpDnT-psHv-Bo19XLT9ohMnbA-FjF_4BRrSPOfKfZOkEjGHfPNTrgHVqXHNcJIFw1oIoO1-lYEO5xFG03kn1Ihnt1qhg1m9G9BV1GwolVswlWFMfifOrEjVx3B2xQl08nsGt13CFInDu3FD3pDElDce-Bx0I3lN1VK6-khaQ13-4' },
      { key: 'avatar_0',  label: 'Avatar đánh giá 1', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJo_oo0kjTqRdFUfzLBr_dXSrTcEDS9eCiwVvCDq5YDBio50y6Gi27nBclPtxzp0B3wZzpuqiz-rwF5YNy-46SShMcQDcaCm4LA8f1tO9m_DntCFTiF6DHywYnAnpySXA1VhXvukKM0ZMZ8ndrKfg40dY6UORrEjtxM2GUODf72MoqpLHvMPWk5E_xGEyM2sZdjh0OYS1K4GpPs0OwTf-CPRw6YjgF-TbmF4cYiOfVBJanBDLFfvoNwBB2FSbf30Ce9OHAdH2rQ8' },
      { key: 'avatar_1',  label: 'Avatar đánh giá 2', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5admmej1kz73vL6kcRXf9JLDObhaH-iKXYUh3slmDq1SY5iQy7SHee19a2x8gagG-hFLdgx6xwRQx3DPX32fVAcI-IvjO7ocKntzm3fr4mxryJjRikp9wG9UBzXDJXQa4Vp_ZKv4IJDqeevmZYNjjaBmIo0Ntsr0nheplQgUPUz5o_LyaFBNJv3Jtm5JbO4CRfq06dVTABOuptBRN8lOmTLBl7tWOThyMvxzoI-PbBhtmxAQNN62iGje8YHFYE1xs-LGlx5ushKM' },
      { key: 'avatar_2',  label: 'Avatar đánh giá 3', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYm4xssX6LbpKL90qi3C53prGiwa6toROKyFmWs7_LJUa0DAuEbKjAkslENhyd0K6Fg2rEF0Ug5vD8zWiaFkWHxGr0IOlgOwl82Gkm5cKLbiedHLHC6jedB6rIO9otaW-QrIkwwThu3HbqxjqUdJxhkJHjHluMtF97AXvX1ZrAnsj0g0giQo8uorA3AyoJhKUWoMZ1y3yV3ZaGWk7fbDuTC67LMdopyGZrzdpcsf-137_09P0uV0hP973p-lxjVOS7lptX1pq7LTE' },
      { key: 'map',       label: 'Bản đồ',             defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM5nLP9FCaASSJXsC23E01Q9z8694iAzzNLxRluVRwoT80lrLqYrtfzRiu1xT0_BzeG_qgrMLs1PYy-msnaRewk-ec7tLelo3HygNaBb4JH92jmcAvbbR5W9yKQgu9blHNtgwsBrwLGa1Q0qzYmqmKpnbQg4QNk4vChQuEz7g8485WlSYRSxJjRlIiA3-tjE4HZBGrU4pP6hUV_TelC9IjdRSiEYMJMP0aEJy7_bRRtJ4viKGb7BCddWvW70R4tdW8-WTjpANilFE' },
    ],
  },

  {
    id: 'coffe-6',
    name: 'Oasis Symphony',
    description: 'Bản nâng cấp menu đầy đủ của phong cách sân vườn: 4 nhóm menu × 4 món (Pha Máy / Truyền Thống / Trà / Bánh Ngọt), gallery bento 4 ảnh, cảm nhận khách hàng và khu liên hệ chi tiết. Hỗ trợ sẵn 4 ngôn ngữ Việt/Anh/Trung/Hàn.',
    category: 'coffee',
    price: 349000,
    priceText: '349,000đ',
    badge: 'MỚI',
    tags: ['Menu 16 Món', 'Gallery Bento', '4 Ngôn Ngữ'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiwCA6-9Nm7Vr8Y4arkvk5aV-3YguTyuqhKXeJbulipcwAXaWA87XlsZ8QpcbiMhCgBWtBHfQEX81syQkxjC4yuu46VYG4aGUC-xKHHNf33UsANIuEJj5Pq6INdysrhjvPNE1LOhdKzUGDpQV2DviLnaCSRYxVp64f2uD8pNPQ9MfPPpVfuqoKZdpZZ_rHXvkTE0AkPr5S2V1zU46uru7kLyHWuNflBiH_67SlxgX0f2av5RHoqMzxX6maxY6A0OQlhgKq41_59gA',
    component: lazy(() => import('../../Template/coffee/Coffe-6/index')),
    schema: schema_coffe6 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroBg',      label: 'Ảnh nền Hero', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkqsQSsTeYHw1cnpeU4Uf8MH_blw-Fu7MpPh180Fi0B0ENa0grGwofz2i4Kx6-FbVrIAnE1ehmWhby5zlEGg4KI36Q6WrJoHaey7gbVBPY9dRIdT93aw_bKShcmlj3SnS8Opb797Fztt-vD1VVZUJs6kyb7idreLbbqq1czNPDN0Zp7jG91PZTCGE8r0PCllLuPuPPXOfMFrazJZyBMP6b61VbyI29Jw0ch2DFXnJW0vFekGId5arfP0JDJ7-WsaR0dS3_3QGKuU' },
      { key: 'galleryMain', label: 'Gallery chính', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiwCA6-9Nm7Vr8Y4arkvk5aV-3YguTyuqhKXeJbulipcwAXaWA87XlsZ8QpcbiMhCgBWtBHfQEX81syQkxjC4yuu46VYG4aGUC-xKHHNf33UsANIuEJj5Pq6INdysrhjvPNE1LOhdKzUGDpQV2DviLnaCSRYxVp64f2uD8pNPQ9MfPPpVfuqoKZdpZZ_rHXvkTE0AkPr5S2V1zU46uru7kLyHWuNflBiH_67SlxgX0f2av5RHoqMzxX6maxY6A0OQlhgKq41_59gA' },
      { key: 'gallery2',    label: 'Gallery 2', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQ2UP4nOD8HiXXgNFXajISfeCloB6FQgunov0MHp-J-WbuuBfvHY1b8meE-rk-AFB9C4GjLCfCAQzkQChjBVtx-g4aFMvMVQiN86ymbHW1VTV_kbGq_u3jUD12fYjGZTMjNIZrG3Wt2c2aGXKnapbSXeAqgmCaI_j7Xzw4lIrYaOzG73_fyen7eKlI83o7MO40MH9brUH7NXAEKl4tAvUU5j56kBobuu8YoHXIn1JpYZorcMpR6x-x5qA8DTus1YpyWN9we-J5A0' },
      { key: 'gallery3',    label: 'Gallery 3', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQFfDbVSGSbbBBZkj4l3cPXiZH_yJssczjPgSZG5o1Yj5b9noIpmuA8xD6T4rJsaWk_qSXNXpv_453CnXn8_Ozn80ACzZ7CrI7NMF2ZlZG3pxsDf4CQv1SY4mJTTskkKtgE3uHGG4XPn4Zuce1m8_70k6pKm5BzTRXjpzTwqlC7XsJ_rEJzbT7MHF6PP0i89iKB2QaLrbgZ4jpeocc2FX53iG8' },
      { key: 'gallery4',    label: 'Gallery 4', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhbuGZT_G_jOWqSCejeZLkTx2yGWMfDaZ0FEdL3I29eQMfPSX0OT-WRQDyoe9NmVYtiVZeWo_koSjeumPuuxcvCx1VZr6dHXn3Nmmi3ftT3QYssLVoE0IKxHkdW09yF5XSdZRBeQdpvWVaszMgniCKHPXuowTUYGBYiAfXRE8i0F36aF5_RG3YjGdfe54ZPRYl33G9kIaXh2JWG5HMOYCYOzYrCqHY3KrmTMgdNSe2aKuQudzQY_IYHkbu-prc1GiXkNKFLpMu2RY' },
    ],
  },
  {
    id: 'coffe-7',
    name: 'Garden Sanctuary',
    description: 'Trải nghiệm không gian sân vườn yên tĩnh ngay giữa lòng thành phố, nơi mỗi tách cà phê là một hành trình tìm về sự tĩnh lặng.',
    category: 'coffee',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["COFFEE","Thực Đơn","Bản Đồ","Đánh Giá"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa7hO-2pu0fubtVfd30zM9SrE0oFcWzg4t0VBgCEe0c1BPJW3B-tsuNvoesemvdHBhb0IR_IrgpnsYjeoiGBVA1oDV03ag3M6wgiGkrZWwNSH3Ey92ulGqlRTOMBQ7or11rBWCiH0Mfe6w1Vjz_Hl3YDpmYqAuCZ_KJDINbR9WUvKd7ZbjPuXEUM5sEegwRqjwfRMysQpvPqVVW_XUDzJE3wRfFEdbMwm2xJozFBWOpeeixZe2WgNl',
    component: lazy(() => import('../../Template/coffee/Coffe-7/index')),
    schema: schema_coffee7 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBa7hO-2pu0fubtVfd30zM9SrE0oFcWzg4t0VBgCEe0c1BPJW3B-tsuNvoesemvdHBhb0IR_IrgpnsYjeoiGBVA1oDV03ag3M6wgiGkrZWwNSH3Ey92ulGqlRTOMBQ7or11rBWCiH0Mfe6w1Vjz_Hl3YDpmYqAuCZ_KJDINbR9WUvKd7ZbjPuXEUM5sEegwRqjwfRMysQpvPqVVW_XUDzJE3wRfFEdbMwm2xJozFBWOpeeixZe2WgNl"
        },
        {
              "key": "menuFeatured",
              "label": "Ảnh Món Featured",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDodW_lmZQ6zKZdUe_3m1_UbLqzM7cw2lB49TMbblqNQOknkbIpuMWgTh_ZIESvcL5vzBZDzWNVhIk8Ri_lOvYhDaXH4jjDZ0ZXD8FwN_4d5bHGyXIHUZEaRGXzh7xOGnwrDX8bOuKKEH1txmHbISOJQ0hT2cqWwzPqPwnuzfMha-q4D5KUk4S3jeS0tyxH9Bjqr8uC8POXzNM_fw23GvM9c647IoD81zhF5JwVPOzDxelGCjX7P_AT"
        },
        {
              "key": "gallery1",
              "label": "Ảnh Gallery 1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAIud2DolIkBtQQvWjhEopoPyJwzSofk2Ih-MKDsMZsFZUD7ua-45yZv0OZiAGI2h3BkhPP7S6nIDO7vwTBho_D997B5jNOKA7ltya1b_b6Ke7fw1zbGf8O6fJ_0B1OkzLRP1OV1tQFucD-Ik_4qV6jGZLydxx0bc2pbYVETieO4REH9ZjNiCMbS4kzlT2dDFaEcoEyrEZmhAgVYj6DhLYMk5bjPn5P98JOldN6KT_nTuyLlh6jh0Xb"
        },
        {
              "key": "gallery2",
              "label": "Ảnh Gallery 2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDy8N8Stgl1FtOs2jnbDJuAMq8gjKfk4I-zDnD6FLobGeSvomblhF5ydUeiOCuU2q0QNbYEzhXuBDfBijpKnADuk580YvyHwRT4apXIpWjiB1xHvqOOW04ymi6hG4nbSktQPAzGAJdhvnpV5ge4j1ZYPwr6ISDZiOHPbapIp_GrtFwKFuQJZwwalnGNyn-8pIMz3cT5nOB0gGDNp1d-KZ_jrHrfu6nnW68O5IKvKxBvjQ_n6QN8jUvg"
        },
        {
              "key": "gallery3",
              "label": "Ảnh Gallery 3",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBYYMYEYfN7FJX13ylAJQBoKXrNuS2sWFZCs33c0WeFSZPQuxUKQxj98R57dmD6DyhH9nDNF93iJa4tZE30nx_B3pk831aprZ5x85DqPXhj5SkMnD5XdNoDMccxJbRThfIjc3VPFugIgNtOxkJniqJpUP8bU5z6n64cq5y6_LDT879F_CCV04OWJ4EfhI1WTMmsJ9-4mUQwSFKvFhYdpW9Pkd3H5oTCGIdY1XJdQpAzYGCeToqNnEWN"
        },
        {
              "key": "gallery4",
              "label": "Ảnh Gallery 4",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDgmrdbVs2erBFKMvjRWdC80zLvyQILUAzyrm1wh_uRheX3Ea2ChA0d-0r1ggaOVsIZ_By-h-_S5GYh2s6MKvXuCgO7SkkGRRxOuBdvsWa1Nu7Y6iSFntADBgq5O8vpCvBI-iAFDXq7T5roHagyf962SQOLDDQwrpwhynbNSokrZOWIUHieU5C9fUJX4OF2abQm_zU_985rBLEUodNAeW2QKneh7H0w3BWlqbGVegm_kap7zHYGm9Mk"
        },
        {
              "key": "avatar1",
              "label": "Ảnh Đánh Giá 1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLtI_ne1U9Nsu3H4YBzSiooK5BQSogLCPk7t4W31d9iHudjuGq_aBgPiUIAKfyCKmJbyBiAA-0a5i-ZEI_r-3emipT3UhDKcqLgmspeS0aqvNubCt1nC8MCFerm9sJZOCmPdXHncxlYz4PmFR1xehQjw_DTIA3__NDuFs0SgUi-fmqfjSx_pzCtuKXUv0VHRa8VS33P0f9P3g8im8BUTAJQjyGew5xmaujuKTACBqkfXVIzK1OFkiNjryG4"
        },
        {
              "key": "avatar2",
              "label": "Ảnh Đánh Giá 2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLvKom7znxLJXRYK6ogR18f3P1yRDUmhAadVjCYfjm9zk-RQIsJdXZzQjXTxPg3UBMyZB-ZkOnGCY17QMvgLlpcHMmH5KXmIbi5xZClguuiC6OGlsZaoFxfpLNVeqMXx4J49ljJhFq28TB0oaQB8q9dpI-xJlLHKgdJU4IjCgTXna55MsPHLQ6c1kPvmRIUqZZl444y-iXX8HTzmDk1ou7M04nd6UVkbwnC0I5dOrnzy6go8VzUQU6FHZmo"
        },
        {
              "key": "avatar3",
              "label": "Ảnh Đánh Giá 3",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLtnqGi6iEPr_VHu33rdGQXmBeI4Yi4ZgH2doQnqMCYmqdbl5ZQjJouy9NbZz82ORWPUaxjvouZulgWuNuVMUYJWm0KBTksB_FkVNX0ffvN0YhyyCNQL4f_QvdcJ9qE4-HonbuOLxFxv527sjFdzk3Xo77NeaLMNWUzS6qTS9XdgTHKmzf70jsk0T8mV2wOCYtq37L9USQZt30aAYDGoGUMUzjXcfyXwa06vp0ztejAZ0CMECNKbRQqQzs8"
        }
  ],
  },
  {
    id: 'coffe-8',
    name: 'Garden Sanctuary',
    description: 'Tận hưởng hương vị cà phê nguyên bản giữa không gian xanh mướt của một khu vườn nhiệt đới thu nhỏ.',
    category: 'coffee',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["COFFEE","Thực Đơn","Bản Đồ","Đánh Giá"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdB27d9Pn_rM-EpTqt-KpZmRwU8-9xBrPxpISCHBXPY2Bs78ToDr2uRCrYHfLHavKcjpc3T2Bwk9yIX5lNX3aUuHTcptC9aZRIj_acME9Dd3e_f31KMifmeXY92bO1OBnwqrWz_UlubfwOZRIcwPjeSlZPY3SuYNXPKuQ2dj0EEYhwvJtQiZp7hWOhACSIIhaEg6mofF-obg238UoBddGzmK-wvJIjF8_UBtGkaigT0yRxBYNz4by1',
    component: lazy(() => import('../../Template/coffee/Coffe-8/index')),
    schema: schema_coffee8 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCdB27d9Pn_rM-EpTqt-KpZmRwU8-9xBrPxpISCHBXPY2Bs78ToDr2uRCrYHfLHavKcjpc3T2Bwk9yIX5lNX3aUuHTcptC9aZRIj_acME9Dd3e_f31KMifmeXY92bO1OBnwqrWz_UlubfwOZRIcwPjeSlZPY3SuYNXPKuQ2dj0EEYhwvJtQiZp7hWOhACSIIhaEg6mofF-obg238UoBddGzmK-wvJIjF8_UBtGkaigT0yRxBYNz4by1"
        },
        {
              "key": "menuFeatured",
              "label": "Ảnh Món Featured",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuB7BHE2MzdhG4Vdi97dbPirRMzCnV1pqC5mUphxrRcO97834hgZNUHC6HGZX5A9BsisjmIPWW_J3logXCV1QrqHcm8DIx3NmWZIhZJpRIPP1DzABG9oWGLnZfkEVmem6QdaGdY-5NtROhNAc9moL55zQ6uaNXUUtxC8G1EJIkGxDp-9rh_amozxTomgL1-zAg1Xy2tpxzwMXbitmV0GHLouqKwt7adUbvDdbixyM2FXIo04WkpoNXQG"
        },
        {
              "key": "gallery1",
              "label": "Ảnh Gallery 1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBExuNaVtcGjuwhR_vuZces8_c4ZUQsy1dZ-zaaK6_3oYFsnMbDqIJFXlAJBPBeB-Ky8iWYSxZb5s0gKsK9KAi5BM2rM9dgdYbY91n8thxqI1TYkTfAMEN3tMGXWW7igbdIl6avvSQqQ7SIC9hH_mwKzVoeJoqLR1jA3yuGWSnGUOmZnyey-ZWCYTIAElMTSe34anAD-ToSkfsxAucnSx84X2tLcDnHkLYH_q5-Io3KShSISI28EACs"
        },
        {
              "key": "gallery2",
              "label": "Ảnh Gallery 2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDTvOYUmV004DMzbKe69PBneRvW5h0xnVfrJyEUjd1my8dvLUBdJ6THn3nhZhBnh48sYOrKwOiZemQGlNx7pT4tdKHM-vQqF52Co6bjRMHqBSWimC2ofE9t0WnavbA9su-e89sPOU0GYDOLTusmDY9FceREboM9HLBQpPQDA-R-H-2POzMOrKGuK2ZR6dw_xZbbULxtnsuBXd6TeyHmFicH2DXLXFu-ObsXKF780WDsILkqApu93aj7"
        },
        {
              "key": "gallery3",
              "label": "Ảnh Gallery 3",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIA9kptxLgFzda2Wu_Xaddedw7polRkt3cK8JZNdSdkwGsmzNnM8yJEs_VY0nYdy568oex6J7qb4DwFDix7uZOLO7RDlW09PGXAXWjDkYb3F6kBYullvV-Au8fitCR6gBphdBVLeOExSngFx9sSRr4WOBDU0WFHwPkeHzqnN2yZBPaAoUTrUjtvAndtZUPZFTd8Pq6Fa-JrXXV9dHUwJJj1Yo9EObvH5gDnY-0y1ha6us-Awy9fPAx"
        },
        {
              "key": "gallery4",
              "label": "Ảnh Gallery 4",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBqxcywH71Q_54l7OO_eMpNZ26BBR9p14So035GBJtVayZnFBP7kJYJ_HapckPXfbbs10AIM8PlxaFRpeRG_IvBYDQvTq4B_GpSU-R7YT30XPTyfUEythPNwqevlzscFDQhwaFLQNXwUpDoM0qg1imbyuSs_AGGPijlbFZdSroCEChX7xCNFxmNPE3xgaLDur0r3HH4Y-zQGU2FJ95WKDuXDqOrcVrpquBkqUYKtuKWNqc94pKv8-89"
        },
        {
              "key": "avatar1",
              "label": "Ảnh Đánh Giá 1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLtI_ne1U9Nsu3H4YBzSiooK5BQSogLCPk7t4W31d9iHudjuGq_aBgPiUIAKfyCKmJbyBiAA-0a5i-ZEI_r-3emipT3UhDKcqLgmspeS0aqvNubCt1nC8MCFerm9sJZOCmPdXHncxlYz4PmFR1xehQjw_DTIA3__NDuFs0SgUi-fmqfjSx_pzCtuKXUv0VHRa8VS33P0f9P3g8im8BUTAJQjyGew5xmaujuKTACBqkfXVIzK1OFkiNjryG4"
        },
        {
              "key": "avatar2",
              "label": "Ảnh Đánh Giá 2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLvKom7znxLJXRYK6ogR18f3P1yRDUmhAadVjCYfjm9zk-RQIsJdXZzQjXTxPg3UBMyZB-ZkOnGCY17QMvgLlpcHMmH5KXmIbi5xZClguuiC6OGlsZaoFxfpLNVeqMXx4J49ljJhFq28TB0oaQB8q9dpI-xJlLHKgdJU4IjCgTXna55MsPHLQ6c1kPvmRIUqZZl444y-iXX8HTzmDk1ou7M04nd6UVkbwnC0I5dOrnzy6go8VzUQU6FHZmo"
        },
        {
              "key": "avatar3",
              "label": "Ảnh Đánh Giá 3",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLtnqGi6iEPr_VHu33rdGQXmBeI4Yi4ZgH2doQnqMCYmqdbl5ZQjJouy9NbZz82ORWPUaxjvouZulgWuNuVMUYJWm0KBTksB_FkVNX0ffvN0YhyyCNQL4f_QvdcJ9qE4-HonbuOLxFxv527sjFdzk3Xo77NeaLMNWUzS6qTS9XdgTHKmzf70jsk0T8mV2wOCYtq37L9USQZt30aAYDGoGUMUzjXcfyXwa06vp0ztejAZ0CMECNKbRQqQzs8"
        }
  ],
  },
];
