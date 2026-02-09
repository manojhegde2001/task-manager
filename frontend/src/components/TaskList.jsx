import { Button, Badge, ActionIcon } from 'rizzui';
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

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          No tasks found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const isCompleted = task.completed;

        return (
          <div
            key={task.id}
            className={`rounded-xl border p-5 flex items-center justify-between transition-all duration-200
              ${isCompleted
                ? 'bg-emerald-50/60 border-emerald-100 shadow-sm'
                : 'bg-white border-gray-200 hover:shadow-md hover:border-gray-300'
              }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <div
                className={`w-2 h-10 rounded-full mt-1
                  ${isCompleted ? 'bg-emerald-400' : 'bg-amber-400'}
                `}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-gray-900">
                    {task.title}
                  </p>
                  {isCompleted && (
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <Badge
                    variant="flat"
                    color={isCompleted ? 'success' : 'warning'}
                    className="text-xs font-medium"
                  >
                    {isCompleted ? 'Completed' : 'Pending'}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {task.createdAt &&
                      new Date(task.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Button
                size="sm"
                variant="flat"
                color={isCompleted ? 'success' : 'warning'}
                className="px-3 text-xs font-medium"
                onClick={() => onToggle(task)}
              >
                {isCompleted ? 'Mark Pending' : 'Mark Done'}
              </Button>

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
        );
      })}
    </div>
  );
}
