import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ column, tasks }) => {
  const { setNodeRef} = useDroppable({
    id: column.id,
  })

  return (
    <div
      ref={setNodeRef}
      className="flex-1 font-semibold mb-4 shadow-md h-screen bg-teal-700 px-4">
      <h1>{column.title}</h1>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
        {tasks.map(task => (
              <Task key={task.id} task={task}></Task>
          ))
          }
          </div>
        </SortableContext>
    </div>
  );
};

export default Column;