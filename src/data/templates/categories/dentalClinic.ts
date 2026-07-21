/**
 * Category: dentalClinic — xem src/data/Template/dentalClinic/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_dentalClinic1 from '../../Template/dentalClinic/DentalClinic-1/i18n/vi.json';
import img_DentalClinic1_card from '../../Template/dentalClinic/DentalClinic-1/screen.png';
import img_DentalClinic1_heroBg from '../../Template/dentalClinic/DentalClinic-1/images/heroBg.jpg';
import img_DentalClinic1_tech1CtScan from '../../Template/dentalClinic/DentalClinic-1/images/tech1CtScan.jpg';
import img_DentalClinic1_tech2Scanner from '../../Template/dentalClinic/DentalClinic-1/images/tech2Scanner.jpg';
import img_DentalClinic1_resultsMain from '../../Template/dentalClinic/DentalClinic-1/images/resultsMain.jpg';
import img_DentalClinic1_facility1Lounge from '../../Template/dentalClinic/DentalClinic-1/images/facility1Lounge.jpg';
import img_DentalClinic1_facility2Treatment from '../../Template/dentalClinic/DentalClinic-1/images/facility2Treatment.jpg';
import img_DentalClinic1_smilePortrait from '../../Template/dentalClinic/DentalClinic-1/images/smilePortrait.jpg';
import img_DentalClinic1_locationMap from '../../Template/dentalClinic/DentalClinic-1/images/locationMap.jpg';
import img_DentalClinic1_avatarUser1 from '../../Template/dentalClinic/DentalClinic-1/images/avatarUser1.jpg';
import img_DentalClinic1_avatarUser2 from '../../Template/dentalClinic/DentalClinic-1/images/avatarUser2.jpg';
import img_DentalClinic1_avatarUser3 from '../../Template/dentalClinic/DentalClinic-1/images/avatarUser3.jpg';

import schema_dentalClinic2 from '../../Template/dentalClinic/DentalClinic-2/i18n/vi.json';
import img_DentalClinic2_card from '../../Template/dentalClinic/DentalClinic-2/screen.png';
import img_DentalClinic2_heroReception from '../../Template/dentalClinic/DentalClinic-2/images/heroReception.jpg';
import img_DentalClinic2_techEquipment from '../../Template/dentalClinic/DentalClinic-2/images/techEquipment.jpg';
import img_DentalClinic2_avatarHoangNam from '../../Template/dentalClinic/DentalClinic-2/images/avatarHoangNam.jpg';
import img_DentalClinic2_transformationResult from '../../Template/dentalClinic/DentalClinic-2/images/transformationResult.jpg';

import schema_dentalClinic3 from '../../Template/dentalClinic/DentalClinic-3/i18n/vi.json';
import img_DentalClinic3_card from '../../Template/dentalClinic/DentalClinic-3/screen.png';
import img_DentalClinic3_heroBg from '../../Template/dentalClinic/DentalClinic-3/images/heroBg.jpg';
import img_DentalClinic3_doctorPortrait from '../../Template/dentalClinic/DentalClinic-3/images/doctorPortrait.jpg';
import img_DentalClinic3_implantPrecision from '../../Template/dentalClinic/DentalClinic-3/images/implantPrecision.jpg';
import img_DentalClinic3_consultationRoom from '../../Template/dentalClinic/DentalClinic-3/images/consultationRoom.jpg';
import img_DentalClinic3_locationMap from '../../Template/dentalClinic/DentalClinic-3/images/locationMap.jpg';

import schema_dentalClinic4 from '../../Template/dentalClinic/DentalClinic-4/i18n/vi.json';
import img_DentalClinic4_card from '../../Template/dentalClinic/DentalClinic-4/screen.png';
import img_DentalClinic4_heroCtScanner from '../../Template/dentalClinic/DentalClinic-4/images/heroCtScanner.jpg';
import img_DentalClinic4_serviceImplantScan from '../../Template/dentalClinic/DentalClinic-4/images/serviceImplantScan.jpg';
import img_DentalClinic4_techCrownMilling from '../../Template/dentalClinic/DentalClinic-4/images/techCrownMilling.jpg';
import img_DentalClinic4_techJawScan from '../../Template/dentalClinic/DentalClinic-4/images/techJawScan.jpg';
import img_DentalClinic4_avatarPatient1 from '../../Template/dentalClinic/DentalClinic-4/images/avatarPatient1.jpg';
import img_DentalClinic4_avatarPatient2 from '../../Template/dentalClinic/DentalClinic-4/images/avatarPatient2.jpg';
import img_DentalClinic4_avatarPatient3 from '../../Template/dentalClinic/DentalClinic-4/images/avatarPatient3.jpg';
import img_DentalClinic4_locationMap from '../../Template/dentalClinic/DentalClinic-4/images/locationMap.jpg';

import schema_dentalClinic5 from '../../Template/dentalClinic/DentalClinic-5/i18n/vi.json';
import img_DentalClinic5_card from '../../Template/dentalClinic/DentalClinic-5/screen.png';
import img_DentalClinic5_heroDoctorPortrait from '../../Template/dentalClinic/DentalClinic-5/images/heroDoctorPortrait.jpg';
import img_DentalClinic5_serviceImplant from '../../Template/dentalClinic/DentalClinic-5/images/serviceImplant.jpg';
import img_DentalClinic5_serviceGeneralLifestyle from '../../Template/dentalClinic/DentalClinic-5/images/serviceGeneralLifestyle.jpg';
import img_DentalClinic5_avatarMinhHoang from '../../Template/dentalClinic/DentalClinic-5/images/avatarMinhHoang.jpg';
import img_DentalClinic5_avatarLanPhuong from '../../Template/dentalClinic/DentalClinic-5/images/avatarLanPhuong.jpg';
import img_DentalClinic5_avatarThuVan from '../../Template/dentalClinic/DentalClinic-5/images/avatarThuVan.jpg';
import img_DentalClinic5_locationMap from '../../Template/dentalClinic/DentalClinic-5/images/locationMap.jpg';

import schema_dentalClinic6 from '../../Template/dentalClinic/DentalClinic-6/i18n/vi.json';
import img_DentalClinic6_card from '../../Template/dentalClinic/DentalClinic-6/screen.png';
import img_DentalClinic6_heroBg from '../../Template/dentalClinic/DentalClinic-6/images/heroBg.jpg';
import img_DentalClinic6_serviceGeneral from '../../Template/dentalClinic/DentalClinic-6/images/serviceGeneral.jpg';
import img_DentalClinic6_serviceCosmetic from '../../Template/dentalClinic/DentalClinic-6/images/serviceCosmetic.jpg';
import img_DentalClinic6_serviceImplant from '../../Template/dentalClinic/DentalClinic-6/images/serviceImplant.jpg';
import img_DentalClinic6_techLaser from '../../Template/dentalClinic/DentalClinic-6/images/techLaser.jpg';
import img_DentalClinic6_techLab from '../../Template/dentalClinic/DentalClinic-6/images/techLab.jpg';
import img_DentalClinic6_testimonialPortrait from '../../Template/dentalClinic/DentalClinic-6/images/testimonialPortrait.jpg';

export const DENTAL_CLINIC_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'dentalClinic-1',
    name: 'Nha Khoa Rạng Ngời',
    description: 'Nha khoa thẩm mỹ cao cấp chuẩn quốc tế. Hero với bằng chứng xã hội (5,000+ khách hàng), khối công nghệ y khoa, dịch vụ đặc quyền, bảng giá minh bạch, không gian phòng khám và đánh giá khách hàng.',
    category: 'dentalClinic',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Nha Khoa', 'Cao Cấp', 'Đặt Lịch'],
    imageUrl: img_DentalClinic1_card,
    component: lazy(() => import('../../Template/dentalClinic/DentalClinic-1/index')),
    schema: schema_dentalClinic1 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroBg',             label: 'Ảnh nền Hero',           defaultUrl: img_DentalClinic1_heroBg },
      { key: 'tech1CtScan',        label: 'Ảnh máy CT Cone Beam',   defaultUrl: img_DentalClinic1_tech1CtScan },
      { key: 'tech2Scanner',       label: 'Ảnh máy quét 3D',        defaultUrl: img_DentalClinic1_tech2Scanner },
      { key: 'resultsMain',        label: 'Ảnh kết quả điều trị',   defaultUrl: img_DentalClinic1_resultsMain },
      { key: 'facility1Lounge',    label: 'Ảnh sảnh chờ VIP',       defaultUrl: img_DentalClinic1_facility1Lounge },
      { key: 'facility2Treatment', label: 'Ảnh phòng điều trị',     defaultUrl: img_DentalClinic1_facility2Treatment },
      { key: 'smilePortrait',      label: 'Ảnh chân dung nụ cười',  defaultUrl: img_DentalClinic1_smilePortrait },
      { key: 'locationMap',        label: 'Ảnh bản đồ',             defaultUrl: img_DentalClinic1_locationMap },
      { key: 'avatarUser1',        label: 'Ảnh đại diện khách 1',   defaultUrl: img_DentalClinic1_avatarUser1 },
      { key: 'avatarUser2',        label: 'Ảnh đại diện khách 2',   defaultUrl: img_DentalClinic1_avatarUser2 },
      { key: 'avatarUser3',        label: 'Ảnh đại diện khách 3',   defaultUrl: img_DentalClinic1_avatarUser3 },
    ],
  },
  {
    id: 'dentalClinic-2',
    name: 'Nha Khoa Sáng Tâm',
    description: 'Template nha khoa cao cấp với hero sảnh tiếp đón sang trọng, khối công nghệ Laser & chẩn đoán 5D, bảng giá dịch vụ chia 2 nhóm (chỉnh nha / thẩm mỹ-phục hình), và khu đánh giá khách hàng dạng bộ sưu tập ảnh kết hợp thẻ testimonial ngôi sao.',
    category: 'dentalClinic',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ['Nha Khoa', 'Cao Cấp', 'Công Nghệ'],
    imageUrl: img_DentalClinic2_card,
    component: lazy(() => import('../../Template/dentalClinic/DentalClinic-2/index')),
    schema: schema_dentalClinic2 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroReception',       label: 'Ảnh nền Hero (sảnh tiếp đón)', defaultUrl: img_DentalClinic2_heroReception },
      { key: 'techEquipment',       label: 'Ảnh thiết bị công nghệ cao',   defaultUrl: img_DentalClinic2_techEquipment },
      { key: 'avatarHoangNam',      label: 'Ảnh đại diện khách hàng',      defaultUrl: img_DentalClinic2_avatarHoangNam },
      { key: 'transformationResult', label: 'Ảnh kết quả thay đổi nụ cười', defaultUrl: img_DentalClinic2_transformationResult },
    ],
  },
  {
    id: 'dentalClinic-3',
    name: 'Nha Khoa Tinh Anh',
    description: 'Template nha khoa phong cách biên tập cao cấp với bố cục lưới sắc nét, đường viền mảnh và bảng giá minh bạch dạng bảng; điểm nhấn là khối "Độ chính xác đến từng milimet" và khu vực đánh giá khách hàng.',
    category: 'dentalClinic',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ['Nha Khoa', 'Tối Giản', 'Bảng Giá Minh Bạch'],
    imageUrl: img_DentalClinic3_card,
    component: lazy(() => import('../../Template/dentalClinic/DentalClinic-3/index')),
    schema: schema_dentalClinic3 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroBg',            label: 'Ảnh nền Hero (ngoại cảnh phòng khám)', defaultUrl: img_DentalClinic3_heroBg },
      { key: 'doctorPortrait',    label: 'Ảnh chân dung bác sĩ',                 defaultUrl: img_DentalClinic3_doctorPortrait },
      { key: 'implantPrecision',  label: 'Ảnh minh hoạ trồng răng Implant',      defaultUrl: img_DentalClinic3_implantPrecision },
      { key: 'consultationRoom',  label: 'Ảnh phòng tư vấn',                     defaultUrl: img_DentalClinic3_consultationRoom },
      { key: 'locationMap',       label: 'Ảnh bản đồ',                          defaultUrl: img_DentalClinic3_locationMap },
    ],
  },
  {
    id: 'dentalClinic-4',
    name: 'Nha Khoa Tân Kỷ Nguyên',
    description: 'Template nha khoa phong cách công nghệ cao với lưới bento hiển thị dịch vụ nổi bật, khu "Độ chính xác micromet" trình bày công nghệ CT Cone Beam/iTero, bảng giá minh bạch dạng bảng và mục đánh giá khách hàng kèm bản đồ.',
    category: 'dentalClinic',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ['Nha Khoa', 'Công Nghệ Cao', 'Đặt Lịch'],
    imageUrl: img_DentalClinic4_card,
    component: lazy(() => import('../../Template/dentalClinic/DentalClinic-4/index')),
    schema: schema_dentalClinic4 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroCtScanner',      label: 'Ảnh Hero (máy CT Cone Beam)',   defaultUrl: img_DentalClinic4_heroCtScanner },
      { key: 'serviceImplantScan', label: 'Ảnh dịch vụ (máy quét Implant 3D)', defaultUrl: img_DentalClinic4_serviceImplantScan },
      { key: 'techCrownMilling',   label: 'Ảnh công nghệ (phay răng sứ CAD/CAM)', defaultUrl: img_DentalClinic4_techCrownMilling },
      { key: 'techJawScan',        label: 'Ảnh công nghệ (mô hình 3D hàm)',    defaultUrl: img_DentalClinic4_techJawScan },
      { key: 'avatarPatient1',     label: 'Ảnh đại diện khách hàng 1',        defaultUrl: img_DentalClinic4_avatarPatient1 },
      { key: 'avatarPatient2',     label: 'Ảnh đại diện khách hàng 2',        defaultUrl: img_DentalClinic4_avatarPatient2 },
      { key: 'avatarPatient3',     label: 'Ảnh đại diện khách hàng 3',        defaultUrl: img_DentalClinic4_avatarPatient3 },
      { key: 'locationMap',        label: 'Ảnh bản đồ',                       defaultUrl: img_DentalClinic4_locationMap },
    ],
  },
  {
    id: 'dentalClinic-5',
    name: 'Nha Khoa An Nhiên',
    description: 'Template nha khoa phong cách "nghỉ dưỡng cao cấp" với hero tông emerald tĩnh lặng, dải thống kê ấn tượng, dịch vụ Implant/Invisalign/Veneer, bảng giá minh bạch, đánh giá khách hàng theo sao và CTA đặt lịch nổi bật.',
    category: 'dentalClinic',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ['Nha Khoa', 'Nghỉ Dưỡng', 'Đánh Giá'],
    imageUrl: img_DentalClinic5_card,
    component: lazy(() => import('../../Template/dentalClinic/DentalClinic-5/index')),
    schema: schema_dentalClinic5 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroDoctorPortrait',      label: 'Ảnh Hero (bác sĩ trong phòng khám)', defaultUrl: img_DentalClinic5_heroDoctorPortrait },
      { key: 'serviceImplant',          label: 'Ảnh dịch vụ (trồng răng Implant)',   defaultUrl: img_DentalClinic5_serviceImplant },
      { key: 'serviceGeneralLifestyle', label: 'Ảnh dịch vụ (khách hàng sau điều trị)', defaultUrl: img_DentalClinic5_serviceGeneralLifestyle },
      { key: 'avatarMinhHoang',         label: 'Ảnh đại diện khách hàng 1',           defaultUrl: img_DentalClinic5_avatarMinhHoang },
      { key: 'avatarLanPhuong',         label: 'Ảnh đại diện khách hàng 2',           defaultUrl: img_DentalClinic5_avatarLanPhuong },
      { key: 'avatarThuVan',            label: 'Ảnh đại diện khách hàng 3',           defaultUrl: img_DentalClinic5_avatarThuVan },
      { key: 'locationMap',             label: 'Ảnh bản đồ',                          defaultUrl: img_DentalClinic5_locationMap },
    ],
  },
  {
    id: 'dentalClinic-6',
    name: 'Nha Khoa Nụ Cười Vàng',
    description: 'Template nha khoa thẩm mỹ cao cấp phong cách bất đối xứng, tôn vinh nhiếp ảnh sản phẩm với tông navy & vàng đồng sang trọng — phù hợp phòng khám định vị thương hiệu cao cấp.',
    category: 'dentalClinic',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ['Nha Khoa Cao Cấp', 'Thẩm Mỹ Nụ Cười', 'Bất Đối Xứng'],
    imageUrl: img_DentalClinic6_card,
    component: lazy(() => import('../../Template/dentalClinic/DentalClinic-6/index')),
    schema: schema_dentalClinic6 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroBg',             label: 'Ảnh nền Hero (không gian phòng khám)', defaultUrl: img_DentalClinic6_heroBg },
      { key: 'serviceGeneral',     label: 'Ảnh dịch vụ tổng quát',                defaultUrl: img_DentalClinic6_serviceGeneral },
      { key: 'serviceCosmetic',    label: 'Ảnh dịch vụ thẩm mỹ nụ cười',          defaultUrl: img_DentalClinic6_serviceCosmetic },
      { key: 'serviceImplant',     label: 'Ảnh dịch vụ cấy ghép Implant',         defaultUrl: img_DentalClinic6_serviceImplant },
      { key: 'techLaser',          label: 'Ảnh công nghệ Laser / chẩn đoán AI',   defaultUrl: img_DentalClinic6_techLaser },
      { key: 'techLab',            label: 'Ảnh phòng Lab CAD/CAM',                defaultUrl: img_DentalClinic6_techLab },
      { key: 'testimonialPortrait', label: 'Ảnh khách hàng testimonial',          defaultUrl: img_DentalClinic6_testimonialPortrait },
    ],
  },
];
