/**
 * Category: spa — xem src/data/Template/spa/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_spa1 from '../../Template/spa/Spa-1/i18n/vi.json';
import schema_spa2 from '../../Template/spa/Spa-2/i18n/vi.json';
import schema_spa4 from '../../Template/spa/Spa-4/i18n/vi.json';
import schema_spa5 from '../../Template/spa/Spa-5/i18n/vi.json';
import schema_spa6 from '../../Template/spa/Spa-6/i18n/vi.json';

export const SPA_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'spa-1',
    name: 'Lotus Spa',
    description: 'Thiết kế tinh tế tông xanh sage cho spa và thẩm mỹ viện cao cấp. Hero fullscreen overlay xanh mướt, grid 6 dịch vụ với icon, info bar emerald sang trọng. Phù hợp nail salon, massage.',
    category: 'spa',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Spa', 'Thẩm Mỹ', 'Massage'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/spa/Spa-1/index')),
    schema: schema_spa1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=70' },
    ],
  },
  {
    id: 'spa-2',
    name: 'Aura Wellness',
    description: 'Tại Aura Wellness, chúng tôi kết hợp khoa học trị liệu làn da chuyên sâu với không gian nghỉ dưỡng tĩnh lặng, mang lại trải nghiệm phục hồi toàn diện.',
    category: 'spa',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["SPA","Bản Đồ"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqhhfM9bFLQdzZ1FgZCH2B6Md4GUbCPodCbEy-I34NdyPONJaBAKvrWEfuokU8bk9YczaW0ttDV9kpBvjKlPr4ogzakNJ_9VTsElrmsRBiF6bKcD1xQnM02C7dz11-Cc2pZf8-HoMh0ezwkCuljEYhmy2bLCsyDEtiX9TdjjTMips9NlflP3ZZKiZBwLN1b_E2UopUJqvSDr-iLc97TKxzFBaCEuBaHol4fhZNiqjixwnfmGIwye4G',
    component: lazy(() => import('../../Template/spa/Spa-2/index')),
    schema: schema_spa2 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroImg",
              "label": "Ảnh Hero",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDqhhfM9bFLQdzZ1FgZCH2B6Md4GUbCPodCbEy-I34NdyPONJaBAKvrWEfuokU8bk9YczaW0ttDV9kpBvjKlPr4ogzakNJ_9VTsElrmsRBiF6bKcD1xQnM02C7dz11-Cc2pZf8-HoMh0ezwkCuljEYhmy2bLCsyDEtiX9TdjjTMips9NlflP3ZZKiZBwLN1b_E2UopUJqvSDr-iLc97TKxzFBaCEuBaHol4fhZNiqjixwnfmGIwye4G"
        },
        {
              "key": "acneImg",
              "label": "acneImg",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDmou1haC8jNjkiDUuGynK92mspCztxLFVfY1dYoGPMbAQATHwSvEC2cHgQiDz-BFVFrJtjEGErUhJR4llJmXQoCLVbpheItOoBW8q7IJgQM_DTy5y4lo8u9mNjxZgqD7UmW8ShyLOVH99lsTildOCUc0ciA_tQzOsM8gXGlffw6Vzzltu9w3ldYHJQgadAhlrIkiuSpIHFDkEsn4iAWADnhbTUlb_PP5knkwZDYEemW2IZWPiYYeB1"
        },
        {
              "key": "skinCareImg",
              "label": "skinCareImg",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCWoCd3jRjtcXPePQRUtU29t_kcebw46QQW-2uTwEY78BuYuksoq3dvlU25nvZbHzWGLdHa3FM9mpl2Pgf0icsXrecJIRjmfr88GcvEAPxIJbGf0pjsKXDWEJ4zZckPZGRe34Va42zSaReool-9-xalJE0R4vLcRbviin6vZa0DhKhlM7V-GVKftlKylDzw2WOE_flxj94LGTxhMZNX4pW_mIPZ_pV3YA7MK_FnEHi3xVdQVG3NVppa"
        },
        {
              "key": "bodyTherapyImg",
              "label": "bodyTherapyImg",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCBL7qUeWqJ88K_d4OMW8e-ZzVyIJEiRisoPzaRXaj3tvsTHNcZrww4tgQw1GSo2ZNU2huf5qz-fHRD9kd7JXGledkR7puqUXL2TVLy1crFV2CV0PBAgyrYQtpmSQzLxgZPlH7kiYU2mJk_d74neMu425tesvnjYbLLwEjimMtIDlGlhr5jV7UhrCBUFczGpNeyrJ8_AhCnhflr8DkiIeYX0uSjrohItSv_oxB0FeXAN28gk-cSGF2e"
        },
        {
              "key": "teamPortrait1",
              "label": "teamPortrait1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCfqSwKdFZ8HnDEDhwU4d1JMOSFrrmzvqXG9d0OLsYJqDPnc3-movtiXfKEkotaH5kygzvlnWgYLAuDyJj8w7kIearwcXYYRJse_kudQI2d_srkSHe1bJIkWKx12z8Lnbrv-3wITRdqVi2f8xLg6TrExV_moHmYGy5TRJrvPES9wcoLlji_N9v73nE-6CWKSFO8xXDukBnHCkCtN3FkShCWSdwuCuupxqXKtpUeom4JNZY5_kS3E8yg"
        },
        {
              "key": "teamPortrait2",
              "label": "teamPortrait2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCeEX9-YIeueFrH_Cca7mUSGcl6V7QTbraFv6BULlkAAVS5ISurHyXIMn-ChPzodcvkrdjHsacDDF_9UCm0-OKM4Y_plv3MnOdIOa3Xg6nWrqvFY3uRY6vw5U47e6Dv0XUmzFSXj-KaMdE2GoxVzC3wDy8LSLZNRfqbgA2qyMcfgQNFM6Z8gwk5W7CL7-1OLX462UlzrJPtMHwqSZogCJzcpBqGbCXnWBWieSAbNS3mO7cGZ2IVZQb_"
        }
  ],
  },
  {
    id: 'spa-4',
    name: 'Luminous Precision Clinic',
    description: 'Trải nghiệm công nghệ thẩm mỹ hiện đại kết hợp với quy trình lâm sàng chuẩn y khoa. Chúng tôi mang đến giải pháp cá nhân hóa cho vẻ đẹp bền vững.',
    category: 'spa',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["SPA","Bản Đồ"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgHTQvNAXEGwb0j91yWvyNfnbdw6HZYs9U7IeaGjGhFUe03UIqcOkNSuMKNBkSIXBK1SOyBKTOIgumTtDRa5TiHtk2iYyQQ33N6rfbhO5sceRmuVo9YU-Nb3x-Xd5lvCdWzNpHBqppG3Jco7WDnQTpZta-WqkXuYdJzXbXzqNZeIKpwKLEdPZ4_Xod5VMwL8ZwAYQCBMiIOnQ14YkIke8_yMC52kTKFbq3KjNMFPZyqecFOxcxWad2',
    component: lazy(() => import('../../Template/spa/Spa-4/index')),
    schema: schema_spa4 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCgHTQvNAXEGwb0j91yWvyNfnbdw6HZYs9U7IeaGjGhFUe03UIqcOkNSuMKNBkSIXBK1SOyBKTOIgumTtDRa5TiHtk2iYyQQ33N6rfbhO5sceRmuVo9YU-Nb3x-Xd5lvCdWzNpHBqppG3Jco7WDnQTpZta-WqkXuYdJzXbXzqNZeIKpwKLEdPZ4_Xod5VMwL8ZwAYQCBMiIOnQ14YkIke8_yMC52kTKFbq3KjNMFPZyqecFOxcxWad2"
        },
        {
              "key": "journey_0",
              "label": "journey_0",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBiddEw4DL9X2KWT_8zF0V2gIHJURiAqiStdAtsRzBd9X8_iGj5avE8cdq4xPksj0Wb37FhSIlNQ8jxaMI0zKeJzhE_6AlM6Rl5MnIe2gsONsgdbCVFi_heZ_Emfd41k3xC3tX09HhQpG4Airr4J89LA64eT0vqepR0GAtlnOi8OmwTu1jvid4zo2jvNV0pMfL2LccnNsCQeWjXko6dHJB10hVQNMzizrRyAVaPEhncAUv3vHWL4eaM"
        },
        {
              "key": "journey_1",
              "label": "journey_1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDUAxp2q5EbfE6XcKetKYAnvGhjJYCH0RNyuB92giLle7OvcOXHCbYSCRHpAfTNDx268M7S8RmdAxD_PMg9QLRqXiSMzMBjkA4TttLjXlR4LLeqPyO8tP4KRZBonMvSgHDtOHwavQ24xH1zXFmjE5-uHT5cNkMv42t4Vucvh-Wvae5yMHhXdyGc9_3uDHfNRYPexwsEll1YoGssjzii1d96galruLDowOJrDRiJjBa0AUSM84qavjRg"
        },
        {
              "key": "journey_2",
              "label": "journey_2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCPX_vQdUT6b1468s2bN8Z7qB8S68DwfkolkUJQBbPzk51sYwgW3mArm7QwQ0m1qksXD4Ze6rk4g_wsqvixOb-yltJcJi4KgZEORvbgBP9wZLtlSFqK8OJtskeCFUB1sfLlfWk1MK_9fkg1gziCQdY8yDQd1xGtl19I1fJBVO5n9xvQjbqE4-DC4_z9GGy8ZMYWCld5b6dEKpe_aZUsa3E8ZhlVR2nNzUbxDkEI9QeGnoic52TNVOve"
        }
  ],
  },
  {
    id: 'spa-5',
    name: 'Zenith',
    description: 'Một không gian tinh tuyển được thiết kế để thanh lọc tâm trí và hồi phục cơ thể thông qua nghệ thuật tối giản.',
    category: 'spa',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["SPA","Bản Đồ","Đánh Giá"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHb8V5K-haV2e-IrpZXgy2z0XdzTA6WQQF9XkzSGQMKhJaNCvSqyjGuH7GM_fLUmBFhv72wT3HmU7AKLwVcKQo2xi7N_UPybcaCnmtV1xE8wbV5GFFdy3ILyZ_lhCkH68K3hUObu9ya80EvZdQ6cdyBYpo6Fdy017PA1ODVqA1Pyy8vit0AvwDLP74Vg6BxeFHMf4R3eYL3tuau8JYiU87C4br8_BDQLB9KJFlXY5l8jsP5MjgC4D0',
    component: lazy(() => import('../../Template/spa/Spa-5/index')),
    schema: schema_spa5 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuCHb8V5K-haV2e-IrpZXgy2z0XdzTA6WQQF9XkzSGQMKhJaNCvSqyjGuH7GM_fLUmBFhv72wT3HmU7AKLwVcKQo2xi7N_UPybcaCnmtV1xE8wbV5GFFdy3ILyZ_lhCkH68K3hUObu9ya80EvZdQ6cdyBYpo6Fdy017PA1ODVqA1Pyy8vit0AvwDLP74Vg6BxeFHMf4R3eYL3tuau8JYiU87C4br8_BDQLB9KJFlXY5l8jsP5MjgC4D0"
        },
        {
              "key": "categoryMeditation",
              "label": "categoryMeditation",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBZ2_To7iN9Dz7EC73l_NNvqzFEQDs4kUNo3JxR9Mx_9T--w1otFt7SF57ZD1o_Fby9_AFjNXv6Y69cXF7KB3gEUWthS4VVJTeexNn0YeWqSmItHoTXa5__rTw0Weclnitx3N9SvvKRw6q-InSYv2oOQJy4z7I-X1uINInf2W9UXWmoWbSjiTd4IZHMA6mohGO7xlCp8Jf24XOWENUsUBXKi19qjWkbtb--lxHBvgfimUMNZZhcfyUI"
        },
        {
              "key": "categoryYoga",
              "label": "categoryYoga",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDmo4np6M62BIP-eWunwdQBSk4AYrf-h-YgCJmSbyM0HhweHaNEyhYfi6NKPKr6O5EeU401xwx-c0oa1LGKHzc45Gr5sRYr1CD4fkpbF5yqL258l7q-OsTnjEzZx4mYJNnGK8uoRxbLGbHzjibOLrUOrRGDW1daga5xH8gR79x8bh9ExaWvcTJvw0FP2i7qlKIoUO6idTNKXDE-NORDJXmZTA2uuao11qoZGMq9TMrB33eG66OXO9Py"
        },
        {
              "key": "categoryHotStone",
              "label": "categoryHotStone",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBqsweb5mPTBm5Jq2NrHDLSannZaxvy3VIogVSZIZPf7cL16rhiryKF4atKvXnll4TrlFoaSg8bgsFZgmc4NlvhUQqQQu_r8l6TlZ72JYnI456wzHelcfYm5scT-EZTQPLRSltq4LuiKdVEWBYPfkdCn8LHj3IsS_x2Jb4bi121TiOEaGcd_3dlO7k-DBqpmNPjZC8c2YMUmb1DF2BD4bAO5t291DFRGcv027qYgLcFJc-Lqa7Tgs_6"
        },
        {
              "key": "categoryOil",
              "label": "categoryOil",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBCsPD3jWmD5_PQNuVKioOdfBdQhsnzOv9mYIBpvUo0vz7BQwVd9L0qCPlTmsjWCkVnSlio87E9IJ3OclntB9_njygpJMyIGfR-ClM4vlTw-RkTsQXRn8Oa2AnGJgAZfMr5FSvD_AaQy_SH-0bQtT20S-U4I0nt3XLKqIPs94c6DmcUA-5NeBAVIXoIv_IOSzoXJXYzEnb85w9gw9f4pk-KALw0HtN8QlCj8SrMsLRuVNtNbRIeUYo7"
        },
        {
              "key": "categoryDetox",
              "label": "categoryDetox",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAG4HpSfOsbGNip28J65NH68soH3QKAqospdCgh2m5pe1fkD3jnr6CYsBsUPnUXSSSmi-BXhl1_ttXQ6Tl2wPOm5FEkpSkaDsk0tgRi_Fa7TBLlMVcD63IIfywvH_qp-_BJxY_HWt1jX5I3JgndDJ__lWGat3oPYGzLmHqVn20gzLZbQbnhpij8BDriE-i7TcgMw06HyawqboMWtfuoXLC-9CZaPCMmo6Xjsqm853YPwg0xjVXmb-Gw"
        },
        {
              "key": "categoryFootBath",
              "label": "categoryFootBath",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBcweJYJN0GYvAiNHQLaygKXhmIzVC5UxLyK_hz4zuv4Cb_x4aRHgVqK_bRrbcKIIJKDM3GcO5kNyN16QafYg8sxYJFMCx_d9JBdft2MFByjQjndiK1TezE4XzUdxMVQLAh0BtrxAO2f1BEGYmFg7HpzWoQ6RS8GcrhKj4-z0j9mwJ6q33OhDlNtqHzEWJOZ3EwVGu7UsW6a4_w2663QYncg8otRcR5x6pbI2ObP5H0DhzDY6EbeXHQ"
        },
        {
              "key": "spaceLobby",
              "label": "spaceLobby",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAGwE56CL3Wd5TPUYLbAdyvTQT3_cRdUn8-AxjX54IZcX6PIlaRoCvSvpD3c7IbXJcJT5L94sM_I1JrZ2YNfuWFimYeOw-B_HyeM4WFuK5vbUMVLG-262EUC9jE06JZ0FiuIwEqOuUp6bE8CDqZ8W63Hg2BQ29xrrZEhtm8l2xdn1e7s_ywuwAQVMmjyMQgao_mIE8-B6cpspP-E51Yw0NxCh8TDi4SRgkJy51yU9FWw79h9TJ8T9ig"
        },
        {
              "key": "spaceRoom",
              "label": "spaceRoom",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAJBXMW7Pkd1KOMSwsYJ7CiEcRpl40b9I_rZYfJl_JtCdUn5jqzQGtPScvdvLH62OP4MyPDgRRns9FcLluM1_b11dkV_NjRTKukLgJQ8h62IAMFmeVxxOcFwK9-0YauEQknftGm9g-28v2MJ9EQxN0NIBhA1WDh_ftqNPXFcmZXBDex-zBmfyJypweBssQFsdzcq2lXM-0bwLwBdSAcRCOeZPb5BJ_UxlQB9ZUZ7Cm7q-hHbC0jS4WN"
        },
        {
              "key": "spaceFacial",
              "label": "spaceFacial",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBxpOVL-fF-f_aG8mPFhU4wCuxpGnsi4Yg-dtqUhf6dsYQ3ZakrK81IQwXJNVOESkwyy5I_O-F2qKU9jHMfoLhgwNxGRN7HBfst_yW5zTr3TsxGEwToSKXmQKgp64Ny6KptuDzbIb6GqGoqpz-j6wbRhObWnAVqXu12PqchjgYfDWCmYn6uMGqWjwHrUvRCGBI7JYPgU12Oi1MQ6tZmlbwHgBsa85m-aLexdc0dIKkqBmvywpsqLW0d"
        },
        {
              "key": "spaceZenGarden",
              "label": "spaceZenGarden",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDzOQCA4MZ3Ehb8P66-ytIIoifd99b_yTU3I4uzbGIW5_PB-JyzmFbaxNhB7meWC0874mITzQfwQccAKkkFFCzFVfdOPSBpfvjR1GrCNMEcKCoBWw2JmMN9wr_bYvagUcjg_dqy7pw7J4eBdytEHoPU5nX6UE7EPBZfsk89es9eJsh-qMHbWNPchDac6bnL_Sdc3CFhBUhE0ErZhcLCJv2IP_JNVvRzLZPLLPbCh4jPRl10mKonAlDh"
        }
  ],
  },
  {
    id: 'spa-6',
    name: 'Ocean Oasis',
    description: 'Đắm mình trong không gian tĩnh lặng, nơi tiếng sóng vỗ và liệu pháp thủy trị liệu mang lại sự cân bằng tuyệt đối cho thân, tâm và trí.',
    category: 'spa',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["SPA","Bản Đồ","Đặt Lịch"],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByBa8xNQHNZlfDqCjq5ELTgW_kYd1i7kzoba00na_rUzcNgBJKx8c9NYRMYnoqN0blNKA7RM-CsvnwAqyHjJ1Kht-Z5Y4frYDiG8VB7nL8bqM-6WKwksizaGOywEwQVdgOmqrPMOvBMD_EkLcWIne3vVLVfnLG5Voz4Z5Y93Gd8WznJYGvWuawAzFpCtIDPWKZrvd8COt7OecZ3bvu9aY3ZPQmqlDQjzUOjc7wz0Cpny5RBKP7-PZx',
    component: lazy(() => import('../../Template/spa/Spa-6/index')),
    schema: schema_spa6 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuByBa8xNQHNZlfDqCjq5ELTgW_kYd1i7kzoba00na_rUzcNgBJKx8c9NYRMYnoqN0blNKA7RM-CsvnwAqyHjJ1Kht-Z5Y4frYDiG8VB7nL8bqM-6WKwksizaGOywEwQVdgOmqrPMOvBMD_EkLcWIne3vVLVfnLG5Voz4Z5Y93Gd8WznJYGvWuawAzFpCtIDPWKZrvd8COt7OecZ3bvu9aY3ZPQmqlDQjzUOjc7wz0Cpny5RBKP7-PZx"
        },
        {
              "key": "highlight1",
              "label": "highlight1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuD8ymX7K1c5Q9QQHGNATOEqZYWHkgq5seCpr1bYs7mqDlA5x_zjtt1UGUjZ70IYMaCyb4Cf8KxcXvMKUq92hOSsoutTCQQAZy9PeVLNnHRSSXAHdv3-FjEcWE5vo2uY6qlOaoFCoZX_z1CvYbbvHh8FNrHCnD4A8J9EYRNvjucevgtv5aknQS-5rIoubQqJVZ2LqLzv-HyUnFbmxdZReSniSWW-UgHQIs14E6y8bB7vFA_3Ma3HVWHO"
        },
        {
              "key": "highlight2",
              "label": "highlight2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBc6eJrAg39d_tx67A2ULw8-0LYNy5kvAR6e23Q0hckehp5X2ZISgR6PMAQGoID5KcH2SS7DRV_KVBEuTZIaKH27_pvd5CCZwgAxOaBA0MWXSi4WBX2hG161Cubr8WR5G22gRseuOGIAp8pWdhKI9UrFfjYinW5pERL-pZAb3adab6c4yp9fLndexSNVbWuElPvDH0ftCWoP3yxSbSPcF_eIiIQxTIsoS8uLon9DyMXLia5oLYT3YYM"
        },
        {
              "key": "highlight3",
              "label": "highlight3",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAjLZc5cFWMKdBXQF2fRqjcV-fKm0gLMk7hQHLI3GOYzb9fGs1DnpQWm582bSCY1UEt3Wuo6snHiBj6rtlZ0O5S_Uv1FF3K8OYGmVhN4Ch6TfGr0KAqmCimlAgnQBIN4mXQlw4LM7Ya3CtgUNZjDQB8R221ZOG_3fz-DwXprK85Yow5d8pEoQs-ray1zXL5LELBRqlt8ESBv_4Ox_CbaJ8vhnIRlSnXaH7cCEuRtWi21WPlMSgWlY8z"
        },
        {
              "key": "atmosphere1",
              "label": "atmosphere1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBbW_6oLSM3OcPkGICD2_lOYz6yK2-r64hkkeh-OaMd0pl89--GGkh_IQMa_QtMCLe5xIfxhqCsjCveZoDa-xkhF201MGdfKovfDRJiDilSe_f5bY93axT8MEwfAaCh3zqQU0ulXeWQ9ybjLvrxHN6sZnyR2vIct-MNPsSVMnblf2MiQ6GQzPiAXYvWK3rMH3oAkGFc_uKHEjIwQOtNVCb1GxuJVSmQUIj8yc6RwQeftq7RUQ3haFq9"
        },
        {
              "key": "atmosphere2",
              "label": "atmosphere2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuA4jQz5p6xkK1fZEeXjkp-HlhanDXr0eSNnR-nx7LnGC_XbQFihBfKq-rcaJ_XDmHfj7eaaXGOCxhaZBBKX7Z_abcW9WmE88EsHBhWxnP0Drp98jDtcUTlU0Z9Swgcxfyb3ipVZYHlFWqvhLZDDLxmZ0wkXdK5HMoETIUEZUjd2PvFCNa3j96aHIAL-VXcdlV0j3eXNAS19qptHjkZ6xcfCSiyMY0K8unAB_CEl1uR9fPj7XIVRE337"
        },
        {
              "key": "locationMap",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC1ECI_CuSv5PK7nJjvURw-cxg2qucw9laUHAPv40A8OwnnzifXA8q1aptuPXQ2YgN7Sq-sMqHqOZANOtDxmpktnS0qla0aSYMjj-a3ndRfMNsq3EqdE8qzDAIx8bHr_M9btr7JWAWsO89ZqNGY_Z8qhx3kM3BhTjrtVpUC96rHgE080g5gJCJLJRm1tAwxySzcrkkfdUHLabzi8NAVc7HCsC5E39YApmUvK9pq_NrDmG1F1JFhk9xh"
        }
  ],
  },
];
