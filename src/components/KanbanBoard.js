import React, { useState, Fragment } from "react";
import KanbanCard from "./KanbanCard";
import EllipsisIcon from "../icons/EllipsisIcon";
import PlusIcon from "../icons/PlusIcon";
import { Dialog, Transition } from "@headlessui/react";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      status: "Not Started",
    },
    {
      id: 2,
      title: "Task 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      status: "Not Started",
    },
    {
      id: 3,
      title: "Task 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Task 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      status: "In Progress",
    },
    {
      id: 5,
      title: "Task 5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      status: "Completed",
    },
  ]);

  const getStatusCount = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  const [statuses, setStatuses] = useState([
    "Not Started",
    "In Progress",
    "Completed",
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("Not Started");
  const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isAddStatusModalOpen, setIsAddStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const closeViewTaskModal = () => {
    setIsViewTaskOpen(false);
    setSelectedTask(null);
  };

  const openViewTaskModal = (task) => {
    setSelectedTask(task);
    setIsViewTaskOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openCreateModal = (status) => {
    setIsCreateModalOpen(true);
    setNewTaskStatus(status);
  };

  const handleDragStart = (e, taskId, currentStatus) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("currentStatus", currentStatus);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const currentStatus = e.dataTransfer.getData("currentStatus");

    if (currentStatus !== newStatus) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === parseInt(taskId)) {
          return { ...task, status: newStatus };
        }
        return task;
      });

      setTasks(updatedTasks);
    }
  };

  const renderTaskCards = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <KanbanCard
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
          onDragStart={handleDragStart}
          onClick={() => openViewTaskModal(task)}
        />
      ));
  };

  const addTask = () => {
    if (newTaskTitle && newTaskDescription) {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        description: newTaskDescription,
        status: newTaskStatus,
      };

      setTasks([...tasks, newTask]);
      closeCreateModal();
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskStatus("Not Started");
    }
  };

  const handleTaskTitleChange = (e) => {
    const newTitle = e.target.value;
    setSelectedTask({ ...selectedTask, title: newTitle });
    setIsSaveButtonDisabled(!newTitle || !selectedTask.description);
  };

  const handleTaskDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setSelectedTask({ ...selectedTask, description: newDescription });
    setIsSaveButtonDisabled(!selectedTask.title || !newDescription);
  };

  const saveTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? selectedTask : task
    );
    setTasks(updatedTasks);
    closeViewTaskModal();
  };

  const deleteTask = () => {
    if (selectedTask) {
      const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id);
      setTasks(updatedTasks);
      closeViewTaskModal();
    }
  };

  const openAddStatusModal = () => {
    setIsAddStatusModalOpen(true);
  };

  const closeAddStatusModal = () => {
    setIsAddStatusModalOpen(false);
  };

  const handleNewStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const addStatus = () => {
    if (newStatus) {
      setStatuses([...statuses, newStatus]);
      closeAddStatusModal();
      setNewStatus("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Started":
        return "red-200";
      case "In Progress":
        return "yellow-200";
      case "Completed":
        return "green-200";
      default:
        return "blue-200"; // Default color for unknown statuses
    }
  };

  return (
    <div className="flex gap-4">
      {statuses.map((status, index) => (
        <div
          key={index}
          className="w-[269px] rounded-lg flex-shrink-0"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <div className="flex justify-between">
            <div className="flex gap-2">
              <h3
                className={`bg-${getStatusColor(status)} px-1 mx-1 rounded w-fit text-sm`}
              >
                {status}
              </h3>
              <span className="text-sm text-gray-400">
                {getStatusCount(status)}
              </span>
            </div>
            <div className="space-x-1 p-0 h-0">
              <button>
                <EllipsisIcon className="w-5 h-5 text-gray-400 hover:text-gray-800  transition-colors" />
              </button>
              <button onClick={() => openCreateModal(status)}>
                <PlusIcon className="w-5 h-5 text-gray-400 hover:text-gray-800  transition-colors" />
              </button>
            </div>
          </div>
          {renderTaskCards(status)}
          <button
            onClick={() => openCreateModal(status)}
            className="bg-white p-2 mt-2 text-sm cursor-pointer text-gray-400 hover:text-gray-800 flex gap-1 items-center justify-center  transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <div className="">New</div>
          </button>
        </div>
      ))}
       <div className="w-[269px] group rounded-lg flex-shrink-0 hover:bg-slate-50 hover:text-gray-800 border-dashed border-2 transition-colors border-gray-300 hover:border-gray-400" onClick={openAddStatusModal}>
        <div className="flex justify-center items-center h-36 transition-colors    rounded-lg cursor-pointer">
          <PlusIcon className="w-5 h-5 transition-colors text-gray-400 group-hover:text-gray-500" />
        </div>
      </div>

      {/* Create task modal */}
      <Transition appear show={isCreateModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeCreateModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[32rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <input
                    placeholder="Add title"
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    id="base-input"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />

                  <textarea
                    id="message"
                    rows="4"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="block mt-2 p-2.5 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add description"
                  ></textarea>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={addTask}
                    >
                      Create new task
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* View task modal */}
      <Transition appear show={isViewTaskOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeViewTaskModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[32rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <input
                    placeholder="Add title"
                    type="text"
                    value={selectedTask ? selectedTask.title : ""}
                    onChange={handleTaskTitleChange}
                    id="base-input"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />

                  <textarea
                    id="message"
                    rows="4"
                    value={selectedTask ? selectedTask.description : ""}
                    onChange={handleTaskDescriptionChange}
                    className="block mt-2 p-2.5 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add description"
                  ></textarea>

                  <div className="mt-4 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center cursor-pointer rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={saveTask}
                      disabled={isSaveButtonDisabled}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={deleteTask}
                    >
                      Delete task
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add status modal */}
      <Transition appear show={isAddStatusModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeAddStatusModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <input
                  type="text"
                  value={newStatus}
                  onChange={handleNewStatusChange}
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Add status"
                />
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    className="inline-flex justify-center cursor-pointer rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={addStatus}
                  >
                    Add
                  </button>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeAddStatusModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default KanbanBoard;
