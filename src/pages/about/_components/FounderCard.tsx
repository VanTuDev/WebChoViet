// ─── Thẻ giới thiệu 1 thành viên sáng lập — trang /about ──────────────────────
// Cả 6 người dùng CHUNG một kiểu thẻ (cùng khung, cùng cỡ ảnh, cùng các dòng thông tin) để ngang hàng:
// ảnh phủ kín thẻ, nhãn ở góc, tên + vai trò + trường đè lên ảnh.

import { teamPhoto } from '../../../config/team';

export interface FounderCardData {
  id: string;
  name: string;
  /** Nhãn nhỏ góc trên-trái của ảnh */
  chip: string;
  /** Dòng phụ dưới tên */
  subtitle: string;
  /** Vai trò dùng cho alt của ảnh */
  altRole: string;
  school: string;
}

export default function FounderCard({ data, brand, eager }: { data: FounderCardData; brand: string; eager?: boolean }) {
  return (
    <article className="group h-full rounded-[1.75rem] p-[3px] bg-gradient-to-br from-primary-container via-primary to-tertiary shadow-xl shadow-primary/15 card-3d">
      <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-300">
        <img
          src={teamPhoto(data.id)}
          srcSet={`${teamPhoto(data.id, 480)} 480w, ${teamPhoto(data.id)} 800w`}
          sizes="(min-width: 1024px) 330px, (min-width: 640px) 45vw, 90vw"
          alt={`${data.name} — ${data.altRole}, ${brand}`}
          width={800}
          height={1000}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary shadow">
          {data.chip}
        </span>
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-viet-lacquer/95 via-viet-lacquer/75 to-transparent px-5 pb-5 pt-20 text-white">
          <h3 className="text-lg lg:text-xl font-display font-extrabold leading-tight">{data.name}</h3>
          <p className="mt-0.5 text-sm font-semibold text-white/90">{data.subtitle}</p>
          <p className="text-xs text-white/70">{data.school}</p>
        </figcaption>
      </figure>
    </article>
  );
}
