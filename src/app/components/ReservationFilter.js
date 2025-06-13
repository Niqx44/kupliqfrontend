// ReservationFilter.js
import { FiSearch } from 'react-icons/fi';

const ReservationFilter = ({ onFilterChange }) => (
  <div className="flex flex-wrap gap-3 my-6 bg-white p-4 rounded-md shadow-md">
    <div className="relative flex-1 min-w-[150px]">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
        <FiSearch />
      </span>
      <input
        type="text"
        placeholder="Search by name"
        className="pl-8 w-full border border-gray-300 bg-white p-2 rounded text-gray-700 shadow-sm"
        onChange={e => onFilterChange('name', e.target.value)}
      />
    </div>
    <input
      type="date"
      className="flex-1 min-w-[150px] border border-gray-300 bg-white p-2 rounded text-gray-700 shadow-sm"
      onChange={e => onFilterChange('date', e.target.value)}
    />
    <input
      type="time"
      className="flex-1 min-w-[150px] border border-gray-300 bg-white p-2 rounded text-gray-700 shadow-sm"
      onChange={e => onFilterChange('time', e.target.value)}
    />
    <select
      className="flex-1 min-w-[150px] border border-gray-300 bg-white p-2 rounded text-gray-700 shadow-sm"
      onChange={e => onFilterChange('status', e.target.value)}
    >
      <option value="">All Status</option>
      <option value="Pending">Pending</option>
      <option value="Rejected">Rejected</option>
      <option value="Confirmed">Confirmed</option>
    </select>
  </div>
);

export default ReservationFilter;
