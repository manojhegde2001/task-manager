import { useState, useEffect } from 'react';
import { Button, Select } from 'rizzui';
import { PlusIcon } from '@heroicons/react/24/outline';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import StatusConfirmModal from './components/StatusConfirmModal';
import { taskService } from './services/api';

const filterOptions = [
  { value: 'all', label: 'All Tasks' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const filterParam = filter !== 'all' ? filter : undefined;
      const response = await taskService.getTasks(filterParam);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data) => {
    setActionLoading(true);
    try {
      await taskService.createTask(data.title);
      await fetchTasks();
      setTaskModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateTask = async (data) => {
    if (!selectedTask) return;
    setActionLoading(true);
    try {
      await taskService.updateTask(selectedTask.id, { title: data.title });
      await fetchTasks();
      setTaskModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const openStatusModal = (task) => {
    setSelectedTask(task);
    setStatusModalOpen(true);
  };

  const handleToggleTask = async () => {
    if (!selectedTask) return;
    setActionLoading(true);
    try {
      await taskService.updateTask(selectedTask.id, { completed: !selectedTask.completed });
      await fetchTasks();
      setStatusModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error toggling task:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    setActionLoading(true);
    try {
      await taskService.deleteTask(selectedTask.id);
      await fetchTasks();
      setDeleteModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const closeTaskModal = () => {
    setTaskModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-gray-600 mt-1">Organize and track your daily tasks</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Select
            options={filterOptions}
            value={filter}
            onChange={(val) => setFilter(val)}
            className="w-full sm:w-56"
            size="lg"
          />
          <Button
            onClick={() => setTaskModalOpen(true)}
            className="flex items-center gap-2 w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow"
            size="lg"
          >
            <PlusIcon className="w-5 h-5" />
            New Task
          </Button>
        </div>

        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={openStatusModal}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />

        <TaskModal
          isOpen={taskModalOpen}
          onClose={closeTaskModal}
          onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
          task={selectedTask}
          loading={actionLoading}
        />

        <StatusConfirmModal
          isOpen={statusModalOpen}
          onClose={() => {
            setStatusModalOpen(false);
            setSelectedTask(null);
          }}
          onConfirm={handleToggleTask}
          task={selectedTask}
          loading={actionLoading}
        />

        <DeleteConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedTask(null);
          }}
          onConfirm={handleDeleteTask}
          loading={actionLoading}
        />
      </div>
    </div>
  );
}
