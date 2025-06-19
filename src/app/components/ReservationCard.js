import { Trash2 } from "lucide-react";

const ReservationCard = ({ name, date, time, status, keterangan, onDelete, onClick }) => {
  return (
    <div className="flex justify-center items-center cursor-pointer" onClick={onClick}>
      <div className="bg-[#E5E5E5] w-full max-w-6xl rounded-xl my-4 px-4 sm:px-6 py-3">
        <div className="bg-white rounded-lg px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[#5C4033] font-bold shadow-sm text-sm sm:text-base gap-3 sm:gap-4">
          <span className="flex-1 truncate">{name || 'Unknown'}</span>
          <span className="flex-1 text-center sm:text-left truncate">{date || 'N/A'}</span>
          <span className="flex-1 text-center sm:text-left truncate">{time || 'N/A'}</span>
          <span className="flex-1 sm:flex-2 truncate">
            <span className="font-bold">ket:</span> {keterangan || 'No notes'}
          </span>
          <span
            className={`flex-1 text-center font-semibold truncate ${
              status?.toLowerCase() === 'confirmed'
                ? 'text-green-700'
                : status?.toLowerCase() === 'unconfirmed'
                ? 'text-yellow-700'
                : 'text-red-700'
            }`}
          >
            {status || 'N/A'}
          </span>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e);
              }}
              className="ml-0 sm:ml-4 text-black hover:text-[#775142]"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;