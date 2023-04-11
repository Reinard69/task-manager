import { useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery, useQueryClient } from "react-query";

import api from "../../services/api";
import InfoCard from "../../components/InfoCard";
import { useAuth } from "../../hooks/auth";
import Modal from "../../components/Modal/Modal";
import TextInput from "../../components/TextInput";
import { formatDate } from "../../helpers/formatDate";
import TasksGroupCard from "../../components/tasksGroupCard";
import { priorities, statusTypes } from "../../constants/constants";

interface DashboardPropTypes {}

export default function Dashboard({}: DashboardPropTypes) {
  const auth = useAuth();
  const [cookies] = useCookies();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [priorityData, setPriorityData] = useState<"high" | "low" | "medium">(
    "medium"
  );
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [statusData, setStatusData] = useState<
    "completed" | "incomplete" | "in progress"
  >("in progress");

  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const config = {
    headers: { Authorization: `Bearer ${cookies["token"]}` },
  };

  const {
    isLoading: isLoadingTasks,
    refetch: getAlltasks,
    data: tasks,
  } = useQuery({
    queryKey: ["query-tasks"],
    queryFn: async () => {
      return await api.get("/tasks", config);
    },
    onSuccess: (res) => {
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
    },
  });

  const {
    isLoading: isLoadingIncompleteTasks,
    refetch: getIncompletetasks,
    data: incompletetasks,
  } = useQuery(
    "query-incompletetasks",
    async () => {
      return await api.get("/tasks?status=incomplete", config);
    },

    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
      },
    }
  );

  const {
    isLoading: isLoadinginProgressTasks,
    refetch: getinProgresstasks,
    data: inProgresstasks,
  } = useQuery(
    "query-inProgresstasks",
    async () => {
      return await api.get("/tasks?status=in progress", config);
    },

    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
      },
    }
  );

  const {
    isLoading: isLoadingcompleteTasks,
    refetch: getcompletetasks,
    data: completetasks,
  } = useQuery(
    "query-completetasks",
    async () => {
      return await api.get("/tasks?status=completed", config);
    },

    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
      },
    }
  );

  function onAddtaskModalClose() {
    setShowAddModal(false);
  }

  function toggleAddModal() {
    setShowAddModal((prev) => !prev);
  }

  async function createTask() {
    try {
      await api.post(
        "/tasks",
        {
          taskName: taskName,
          status: statusData,
          priority: priorityData,
          dueDate: date,
          description: description,
        },
        config
      );
      queryClient.invalidateQueries(), setShowAddModal(false);

      setTaskName("");
      setDescription("");
      setDate(new Date(Date.now()));
      setStatusData("in progress");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col p-3">
      <p className="text-3xl font-bold text-black">Dashboard</p>
      <button
        className="px-3 py-2 bg-blue-400 rounded-lg text-white w-36 mt-5 shadow-2xl"
        onClick={toggleAddModal}
      >
        Add +
      </button>
      <p className="text-xl text-black mt-5">Hello, What are we doing today?</p>
      <div className="flex md:flex-row flex-col justify-evenly mt-8 gap-6">
        <InfoCard
          label={"In Progress"}
          isLoading={isLoadinginProgressTasks}
          number={inProgresstasks?.data.tasks.length}
        />
        <InfoCard
          label={"Uncompleted"}
          isLoading={isLoadingIncompleteTasks}
          number={incompletetasks?.data.tasks.length}
        />
        <InfoCard
          label={"Completed"}
          isLoading={isLoadingcompleteTasks}
          number={completetasks?.data.tasks.length}
        />
        <InfoCard
          label={"All"}
          isLoading={isLoadingTasks}
          number={tasks?.data.tasks.length}
        />
      </div>
      <div className="flex md:flex-row flex-col  w-full justify-evenly mt-8 gap-6 ">
        <TasksGroupCard title={"In progress"} tasksType={inProgresstasks} />
        <TasksGroupCard title={"Uncompleted"} tasksType={incompletetasks} />
        <TasksGroupCard title={"Completed"} tasksType={completetasks} />
        <TasksGroupCard title={"All"} tasksType={tasks} />
      </div>
      <Modal
        children={
          <div className="w-96">
            <TextInput
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              tailwindInputStyle="w-full h-10 px-3"
            />
            <TextInput
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              tailwindInputStyle="w-full h-10 px-3"
            />
            <div>
              <p>Due date</p>
              <input
                type="date"
                value={formatDate(date)}
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </div>
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
                {priorities?.map((priorityType) => (
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
                {statusTypes?.map((status) => (
                  <option key={status} value={status}>
                    {status.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="px-3 py-2 bg-blue-400 rounded-2xl w-36 mt-5 shadow-2xl"
              onClick={createTask}
            >
              Create task
            </button>
          </div>
        }
        show={showAddModal}
        onClose={onAddtaskModalClose}
      />
    </div>
  );
}
