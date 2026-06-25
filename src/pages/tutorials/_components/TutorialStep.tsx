interface Props {
  num: string;
  title: string;
  desc: string;
}

export default function TutorialStep({ num, title, desc }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow relative overflow-hidden transition-all">
      <span className="text-5xl font-display font-black text-[#e3f2fd] absolute right-4 top-2 select-none">
        {num}
      </span>
      <div className="relative z-10 pt-4 space-y-3">
        <h3 className="text-sm font-bold text-gray-800 font-display">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
