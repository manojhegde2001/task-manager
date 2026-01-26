import { Button, Badge, ActionIcon, Checkbox } from 'rizzui';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TaskList({ tasks, onToggle, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-gray-500 mt-4">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">No tasks found</h3>
        <p className="mt-2 text-sm text-gray-500">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:shadow-md hover:border-gray-300 transition-all duration-200"
        >
          <div className="flex items-center gap-4 flex-1">
            <Checkbox
              checked={task.completed}
              onChange={() => onToggle(task)}
              className="shrink-0"
              size="lg"
            />
            <div className="flex-1">
              <p className={`text-base font-medium transition-all ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <Badge
                  variant="flat"
                  color={task.completed ? 'success' : 'warning'}
                  className="text-xs font-medium"
                >
                  {task.completed ? '✓ Completed' : '○ Pending'}
                </Badge>
                <span className="text-xs text-gray-400">
                  {new Date(task.createdAt).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <ActionIcon
              variant="outline"
              onClick={() => onEdit(task)}
              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
              size="lg"
            >
              <PencilIcon className="w-4 h-4" />
            </ActionIcon>
            <ActionIcon
              variant="outline"
              color="danger"
              onClick={() => onDelete(task)}
              className="hover:bg-red-50 hover:border-red-300 transition-colors"
              size="lg"
            >
              <TrashIcon className="w-4 h-4" />
            </ActionIcon>
          </div>
        </div>
      ))}
    </div>
  );
}
