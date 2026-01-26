import { Modal, Button } from 'rizzui';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="m-auto px-7 pt-6 pb-8 max-w-md">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Delete Task
          </h3>
          <p className="text-gray-600">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button color="danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
