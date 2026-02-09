import { useEffect } from 'react';
import { Modal, Button, Input } from 'rizzui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required').trim(),
});

export default function TaskModal({ isOpen, onClose, onSubmit, task, loading }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
    },
  });

  useEffect(() => {
    if (task) {
      reset({ title: task.title });
    } else {
      reset({ title: '' });
    }
  }, [task, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset({ title: '' });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      overlayClassName="backdrop-blur-sm bg-black/60"
      containerClassName="!max-w-md"
    >
      <div className="bg-white rounded-xl shadow-xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {task ? 'Update your task details' : 'Add a new task to your list'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-6">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Task Title"
                  placeholder="Enter task title"
                  error={errors.title?.message}
                  errorClassName='!text-red-500'
                  className="w-full"
                  size="lg"
                />
              )}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                reset({ title: '' });
                onClose();
              }}
              disabled={loading}
              size="lg"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              size="lg"
              className="min-w-24"
            >
              {loading ? 'Saving...' : task ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
