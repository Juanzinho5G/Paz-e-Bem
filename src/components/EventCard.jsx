function EventCard({ title, time, date, image }) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex gap-4">
        <img src={image} alt={title} className="w-24 h-20 rounded-md object-cover" />
        <div className="flex-1">
          <div className="text-xs leading-tight space-y-1">
            <div>
              <span className="text-xs font-semibold text-gray-800">NOME: </span>
              <span className="text-xs text-gray-700">{title}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-800">HORÁRIO: </span>
              <span className="text-xs text-gray-700">{time}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-800">DATA: </span>
              <span className="text-xs text-gray-700">{date}</span>
            </div>
          </div>
          <div className="mt-2">
            <button className="bg-[#BFA5FF] text-gray-700 px-4 py-1 text-xs font-semibold rounded-md hover:bg-[#a88ef0]">
              DETALHES
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
