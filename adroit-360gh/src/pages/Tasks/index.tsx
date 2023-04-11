import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import api from "../../services/api";
import { useCookies } from "react-cookie";
import { AiOutlineSearch, AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { formatDate } from "../../helpers/formatDate";
import { Task } from "../../types/userType";
import FilterModal from "../../components/FilterModal";
import { priorities, statusTypes } from "../../constants/constants";
import TextInput from "../../components/TextInput";
import Modal from "../../components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultDate = new Date(Date.now());

export default function Tasks() {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setsearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [priority, setPriority] = useState<"high" | "low" | "medium">("medium");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "completed" | "incomplete" | "in progress"
  >("in progress");

  const [dueDate, setdueDate] = useState<Date>(new Date(Date.now()));
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [id, setId] = useState<string | null>(null);

  const [priorityData, setPriorityData] = useState<
    "high" | "low" | "medium" | "all"
  >("all");

  const [statusData, setStatusData] = useState<
    "completed" | "incomplete" | "in progress" | "all"
  >("all");

  const [date, setDate] = useState<Date>(defaultDate);

  const handleDebounce = (value: string) => {
    if (!value.length) {
      getAlltasks();
    }

    setSearchQuery(value);

    setTimeout(() => {
      setsearch(value);
      getAlltasks();
    }, 1000);
  };

  const toggleFilterModal = useCallback(
    () => setShowFilterModal((prev) => !prev),
    []
  );

  const reset = () => {
    setTaskName("");
    setDescription("");
    setDate(new Date(Date.now()));
    setStatusData("in progress");
  };

  const config = {
    headers: { Authorization: `Bearer ${cookies["token"]}` },
  };
  const {
    isLoading: isLoadingTasks,
    refetch: getAlltasks,
    data: tasks,
  } = useQuery({
    queryKey: ["querytasks", search],
    queryFn: async () => {
      return await api.get(
        `/tasks?search=${search}&status=${statusData}&priority=${priorityData}&dueDate=${
          date === defaultDate ? "all" : date
        }`,
        config
      );
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
    isLoading: isTaskdetailsLoading,
    data: taskDetails,
    refetch,
  } = useQuery({
    queryKey: ["query-task-details", search],
    enabled: id != null,
    queryFn: async () => {
      return await api.get(`/tasks/${id}`, config);
    },
    onSuccess: (res) => {
      console.log({ res: res?.data });
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
    },
  });

  const applyFilter = async () => {
    await getAlltasks();
    setShowFilterModal(false);
  };

  const undoFilters = async () => {
    setStatusData("all");
    setPriorityData("all");
    setDate(defaultDate);
    setTimeout(async () => {
      await getAlltasks();
    }, 300);
    setShowFilterModal(false);
  };

  function toggleAddModal() {
    setShowAddModal((prev) => !prev);
  }

  function onAddtaskModalClose() {
    setId(null);
    reset();
    setShowAddModal(false);
  }

  async function createTask() {
    try {
      await api.post(
        "/tasks",
        {
          taskName: taskName,
          status: status,
          priority: priority,
          dueDate: dueDate,
          description: description,
        },
        config
      );
      queryClient.invalidateQueries(), setShowAddModal(false);

      reset();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function getTask(id: string) {
    setModalMode("edit");
    setId(id);
  }

  async function updateTask() {
    try {
      await api.put(
        `/tasks/${id}`,
        {
          taskName: taskName,
          status: status,
          priority: priority,
          dueDate: dueDate,
          description: description,
        },
        config
      );
      queryClient.invalidateQueries(), setModalMode("add");
      setId(null);
      setShowAddModal(false);

      reset();
    } catch (error) {
      console.log({ error });
    }
  }

  async function deleteTask(id: string) {
    try {
      await api.delete(
        `/tasks/${id}`,

        config
      );
      queryClient.invalidateQueries();
      toast("Successfully deleted");
    } catch (error) {}
  }

  useEffect(() => {
    if (modalMode == "edit") {
      const { description, dueDate, status, priority, taskName } =
        taskDetails?.data.task;

      setTaskName(taskName);
      setDescription(description);
      setdueDate(new Date(dueDate));
      setStatus(status);
      setPriority(priority);
      setShowAddModal(true);
    }

    return () => {};
  }, [taskDetails]);

  return (
    <div className="flex flex-col p-3">
      <p className="text-3xl font-bold text-black">Task List</p>
      <div className="flex justify-end">
        <div className="flex items-center bg-white rounded-lg h-10 border-transparent focus:border-transparent outline-none outline-transparent">
          <AiOutlineSearch />
          <input
            placeholder="search here..."
            // size={3}
            value={searchQuery}
            onChange={(e) => handleDebounce(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="px-3 py-2 bg-blue-400 rounded-lg text-white w-36 mt-5 shadow-2xl"
          onClick={toggleAddModal}
        >
          Add +
        </button>
        <button
          className="px-3 py-2 bg-blue-400 rounded-lg text-white w-36 mt-5 shadow-2xl"
          onClick={toggleFilterModal}
        >
          filter
        </button>
      </div>
      <div className="flex flex-col">
        <div className="border flex flex-col items-center rounded-2xl py-4 h-192-r overflow-auto mt-5">
          {tasks?.data?.tasks.map((task: Task) => (
            <div
              key={task.userId + task.taskName}
              className="bg-white text-black p-6 mb-4 rounded-xl shadow-xl w-2/3"
            >
              <div className="flex justify-between">
                <p key={task.userId} className="capitalize">
                  {task.taskName}
                </p>
                <div className="flex gap-3">
                  <button
                    className=" border-2 rounded-md border-blue-300 px-3 py-2 h-8 md:h-auto"
                    onClick={() => getTask(task._id)}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className=" border-2 h-8 md:h-auto rounded-md border-red-300 text-red-600 px-3 py-2"
                    onClick={() => deleteTask(task._id)}
                  >
                    <AiOutlineDelete />
                  </button>
                  <div
                    className={`border ${
                      task.priority === "high"
                        ? "border-red-500"
                        : task.priority === "medium"
                        ? "border-green-500"
                        : "border-blue-500"
                    } rounded-md flex justify-center w-min p-1 shadow-2xl h-7`}
                  >
                    <p className="text-xs">{task.priority}</p>
                  </div>
                </div>
              </div>
              <p className="w-2/3 text-sm capitalize overflow-hidden">
                {task.description}
              </p>
              <p className="w-2/3 text-sm">
                {formatDate(new Date(task.dueDate))}
              </p>
            </div>
          ))}
        </div>
        {showFilterModal && (
          <FilterModal
            priorityData={priorityData}
            setPriorityData={setPriorityData}
            statusData={statusData}
            setStatusData={setStatusData}
            date={date}
            setDate={setDate}
            applyFilter={applyFilter}
            defaultDate={defaultDate}
            undoFilters={undoFilters}
          />
        )}
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
                  value={formatDate(dueDate)}
                  onChange={(e) => setdueDate(new Date(e.target.value))}
                />
              </div>
              <div className="mt-3">
                <p className="dark:text-gray-300">Priority</p>
                <select
                  name="priorityType"
                  id="priorityType"
                  className="border w-full p-2 rounded-lg"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "high" | "low" | "medium")
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
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as
                        | "completed"
                        | "incomplete"
                        | "in progress"
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
              {modalMode === "add" ? (
                <button
                  className="px-3 py-2 bg-blue-400 rounded-2xl w-36 mt-5 shadow-2xl"
                  onClick={createTask}
                >
                  Create task
                </button>
              ) : (
                <button
                  className="px-3 py-2 bg-blue-400 rounded-2xl w-36 mt-5 shadow-2xl"
                  onClick={updateTask}
                >
                  Edit task
                </button>
              )}
            </div>
          }
          show={showAddModal}
          onClose={onAddtaskModalClose}
        />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
