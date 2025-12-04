import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function EventCard({ title, time, date, image, detailsTo }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 overflow-hidden flex cursor-pointer">
      <div className="w-24 h-24 flex-shrink-0 bg-slate-200">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-center">
        <div className="space-y-2">
          <div className="text-purple-600 text-xs uppercase font-bold tracking-wide">
            Publicação
          </div>
          <div className="text-slate-700 text-sm font-semibold line-clamp-1">
            {title}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">🕐 {time}</span>
            <span className="flex items-center gap-1">📅 {date}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center pr-3">
        {detailsTo ? (
          <Link to={detailsTo} className="text-slate-300 hover:text-slate-400">
            <ChevronRightIcon className="w-5 h-5" />
          </Link>
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-slate-300" />
        )}
      </div>
    </div>
  );
}

export default EventCard;
