// Card hiển thị 1 project trong danh sách dashboard
import { Edit3, Eye, Trash2, Calendar } from 'lucide-react';
import type { Project } from '../../../../types';

interface Props {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onPreview: () => void;
  onDelete: () => void;
}

export default function ProjectCard({ project, isSelected, onSelect, onEdit, onPreview, onDelete }: Props) {
  const thumbnail = project.items[0]?.imageUrl ??
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80';

  return (
    <article
      onClick={onSelect}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white overflow-hidden transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'border-[#00aaff] ring-2 ring-[#00aaff]/10 shadow-md -translate-y-0.5'
          : 'border-gray-200/80 hover:border-gray-300 hover:shadow shadow-sm'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-gray-50 overflow-hidden">
        <img
          src={thumbnail}
          alt={project.storeName}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 right-3 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
          project.status === 'Active' ? 'bg-[#00aaff]' : 'bg-gray-400'
        }`}>
          ● {project.status}
        </span>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 font-display group-hover:text-[#0056b3] transition-colors leading-snug">
            {project.storeName}
          </h3>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Cập nhật: {project.lastUpdated}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {project.description || 'Chưa cấu hình mô tả.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
          <button
            onClick={e => { e.stopPropagation(); onEdit(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition-colors cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Sửa</span>
          </button>
          <button
            onClick={e => { e.stopPropagation(); onPreview(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-[#0056b3] hover:bg-[#003f87] text-white transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Xem Live</span>
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(); }}
            className="p-2 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors cursor-pointer"
            title="Xóa dự án"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
