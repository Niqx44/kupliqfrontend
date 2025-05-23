const ReservationCard = ({ name, date, time, status, keterangan }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#E5E5E5] w-full max-w rounded-xl my-4 px-6 py-3">
        <div className="bg-white rounded-lg px-8 py-3 flex flex-wrap sm:flex-nowrap justify-between items-center text-[#5C4033] font-bold shadow-sm text-sm">
          <span className="w-40 text-center sm:text-left">{name}</span>
          <span className="w-32 text-center">{date}</span>
          <span className="w-24 text-center">{time}</span>
          <div className="w-40 flex justify-center items-center gap-3">
            <span className="text-[#5C4033]">keterangan: {keterangan}</span>
            <span className="font-normal text-black"> {status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
