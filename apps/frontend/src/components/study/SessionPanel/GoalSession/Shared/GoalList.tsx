import { Button } from '@common/Button';
import { Checked, RoundClose, Unchecked } from '@common/Icon';
import { TaskStatus, useTaskStore } from '@hooks/stores/useTaskStore';
type GoalListProps = {
  className?: string;
};

export const GoalList = ({ className }: GoalListProps) => {
  const { taskList, deleteTask, updateTask } = useTaskStore();
  return (
    <div className={className}>
      {taskList.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between w-full px-4 py-2 bg-black rounded-lg"
        >
          <div className="flex items-center">
            <Button
              className="p-1 mr-2 bg-black"
              onClick={() => {
                const newStatus =
                  task.status === TaskStatus.OPEN
                    ? TaskStatus.COMPLETED
                    : TaskStatus.OPEN;

                updateTask(task.id, { ...task, status: newStatus });
              }}
            >
              {task.status === TaskStatus.OPEN ? (
                <Unchecked />
              ) : (
                <Checked className="text-primary" />
              )}
            </Button>
            <strong>{task.content}</strong>
          </div>

          <Button className="p-1 bg-black" onClick={() => deleteTask(task.id)}>
            <RoundClose />
          </Button>
        </div>
      ))}
    </div>
  );
};
