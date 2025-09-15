import { Button } from '@components/common/Button';
import { Checked, RoundClose, Unchecked } from '@components/common/Icon';
import { tailwindMerge } from '@frontend/utils/merge';
import { TaskStatus, useTaskStore } from '@hooks/stores/useTaskStore';
type GoalListProps = {
  className?: string;
};

export const GoalList = ({ className }: GoalListProps) => {
  const { taskList, deleteTask, updateTask } = useTaskStore();
  return (
    <div
      className={tailwindMerge(
        'flex flex-col items-center justify-start w-full gap-2 overflow-y-auto pr-1',
        className
      )}
    >
      {taskList.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between w-full px-4 py-2 bg-black rounded-lg group"
        >
          <div className="flex items-center min-h-[40px]">
            <Button
              variant={'icon'}
              className={`p-1 mr-2 bg-black border-none ${
                task.status === TaskStatus.OPEN
                  ? '-ml-9 group-hover:ml-0 transition-all duration-300'
                  : ''
              }`}
              onClick={() => {
                const newStatus =
                  task.status === TaskStatus.OPEN
                    ? TaskStatus.COMPLETED
                    : TaskStatus.OPEN;

                updateTask(task.id, { ...task, status: newStatus });
              }}
            >
              {task.status === TaskStatus.OPEN ? (
                <Unchecked className="text-light-mode" />
              ) : (
                <Checked className="text-primary" />
              )}
            </Button>
            <strong className="">{task.content}</strong>
          </div>

          <Button
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-transparent"
            onClick={() => deleteTask(task.id)}
          >
            <RoundClose className="text-light-mode" />
          </Button>
        </div>
      ))}
    </div>
  );
};
