import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum TaskStatus {
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED'
}

type TaskType = {
  id: string;
  status: TaskStatus;
  content: string;
  date: Date;
};

export type TaskStore = {
  taskList: TaskType[];

  addTask: (task: TaskType) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, newData: Partial<TaskType>) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      taskList: [],

      addTask: (task) =>
        set((state) => ({ taskList: [...state.taskList, task] })),

      deleteTask: (id) =>
        set((state) => ({
          taskList: state.taskList.filter((task) => task.id !== id)
        })),

      updateTask: (id, newData) =>
        set((state) => ({
          taskList: state.taskList.map((task) =>
            task.id === id ? { ...task, ...newData } : task
          )
        }))
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({ taskList: state.taskList })
    }
  )
);
