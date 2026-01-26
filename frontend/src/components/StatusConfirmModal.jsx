import { Modal, Button } from 'rizzui';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function StatusConfirmModal({ isOpen, onClose, onConfirm, task, loading }) {
  if (!task) return null;

  const isCompleting = !task.completed;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      overlayClassName="backdrop-blur-sm bg-black/60"
      containerClassName="!max-w-md"
    >
      <div className="bg-white rounded-xl shadow-xl p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            isCompleting ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            {isCompleting ? (
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            ) : (
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isCompleting ? 'Mark as Completed?' : 'Mark as Pending?'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {isCompleting 
                ? 'Are you sure you want to mark this task as completed?' 
                : 'Are you sure you want to mark this task as pending?'}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-sm font-medium text-gray-900">{task.title}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={loading}
            size="lg"
          >
            Cancel
          </Button>
          <Button 
            color={isCompleting ? 'success' : 'warning'}
            onClick={onConfirm} 
            disabled={loading}
            size="lg"
            className="min-w-24"
          >
            {loading ? 'Updating...' : 'Confirm'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
