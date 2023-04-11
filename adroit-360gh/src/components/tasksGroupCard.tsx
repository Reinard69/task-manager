import React from "react";
import { formatDate } from "../helpers/formatDate";
import { Task } from "../types/userType";
import { AxiosResponse } from "axios";

interface TaskGroupTypes {
  title: string;
  tasksType: AxiosResponse<any, any> | undefined;
}

function tasksGroupCard({ tasksType, title }: TaskGroupTypes) {
  return (
    <div className="bg-gray-300 min-w-3 px-10 py-5 rounded-2xl flex flex-col items-center h-80 overflow-auto">
      <p className="text-black mb-5">{title}</p>
      <div>
        {tasksType?.data?.tasks.map((task: Task) => (
          <div
            key={task.userId + task.taskName}
            className="bg-white text-black p-6 mb-4 rounded-xl shadow-xl capitalize"
          >
            <p>{task.taskName}</p>
            <div className="flex justify-between">
              <p className="text-xs">{formatDate(new Date(task.dueDate))}</p>
              <div
                className={`border ${
                  task.priority === "high"
                    ? "border-red-500"
                    : task.priority === "medium"
                    ? "border-green-500"
                    : "border-blue-500"
                } rounded-md flex justify-center p-1`}
              >
                <p className="text-[8px]">{task.priority}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default tasksGroupCard;
