import { Trash2 } from "lucide-react";

const ReservationCard = ({ name, date, time, status, keterangan, onDelete, onClick }) => {
  return (
    <div className="flex justify-center items-center cursor-pointer" onClick={onClick}>
      <div className="bg-[#E5E5E5] w-full max-w-6xl rounded-xl my-4 px-6 py-3">
        <div className="bg-white rounded-lg px-8 py-4 flex flex-wrap sm:flex-nowrap justify-between items-center text-[#5C4033] font-bold shadow-sm text-sm relative">
          <span className="w-40 text-center sm:text-left">{name}</span>
          <span className="w-32 text-center">{date}</span>
          <span className="w-28 text-center">{time}</span>
          <span className="w-60 text-center sm:text-left">
            <span className="font-bold">ket:</span> {keterangan}
          </span>
          <span className="w-28 text-center text-black font-semibold">{status}</span>

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e);
              }}
              className="ml-4 text-black hover:text-[#775142]"
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
