import React from "react";
import { priorities, statusTypes } from "../constants/constants";
import { formatDate } from "../helpers/formatDate";

interface FilterModalTypes {
  priorityData: "high" | "low" | "medium" | "all";
  setPriorityData: React.Dispatch<
    React.SetStateAction<"high" | "low" | "medium" | "all">
  >;
  statusData: "completed" | "incomplete" | "in progress" | "all";
  setStatusData: React.Dispatch<
    React.SetStateAction<"completed" | "incomplete" | "in progress" | "all">
  >;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  applyFilter: () => void;
  defaultDate: Date;
  undoFilters: () => void;
}

function FilterModal({
  priorityData,
  setPriorityData,
  statusData,
  setStatusData,
  date,
  setDate,
  applyFilter,
  defaultDate,
  undoFilters,
}: FilterModalTypes) {
  return (
    <div className="absolute right-1 top-28 border bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 z-30">
      <div>
        <div className="mt-3">
          <p className="dark:text-gray-300">Priority</p>
          <select
            name="priorityType"
            id="priorityType"
            className="border w-full p-2 rounded-lg"
            value={priorityData}
            onChange={(e) =>
              setPriorityData(e.target.value as "high" | "low" | "medium")
            }
          >
            {[...priorities, "all"]?.map((priorityType) => (
              <option key={priorityType} value={priorityType}>
                {priorityType.toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <p className="dark:text-gray-300">Status</p>
          <select
            name="priorityType"
            id="priorityType"
            className="border w-full p-2 rounded-lg"
            value={statusData}
            onChange={(e) =>
              setStatusData(
                e.target.value as "completed" | "incomplete" | "in progress"
              )
            }
          >
            {[...statusTypes, "all"]?.map((status) => (
              <option key={status} value={status}>
                {status.toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Due date</p>
          <div className="flex gap-6">
            <input
              type="date"
              value={formatDate(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            {date === defaultDate ? (
              <p>Select a date if you want a filter</p>
            ) : (
              <p>{formatDate(date)}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="px-3 py-2 bg-blue-400 rounded-lg text-sm text-white w-36 mt-5 shadow-2xl"
            onClick={applyFilter}
          >
            Apply
          </button>
          <button
            className="px-3 py-2 bg-white text-black border rounded-lg text-sm w-36 mt-5 shadow-2xl"
            onClick={undoFilters}
          >
            Remove filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
