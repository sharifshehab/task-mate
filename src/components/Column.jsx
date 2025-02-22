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
      className="flex-1 font-semibold mb-4 shadow-md h-screen bg-blue-500 p-4">
      <h1 className="text-center text-2xl underline underline-offset-8 my-5 text-white">{column.title}</h1>
      <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
        {tasks.map(task => (
              <Task key={task._id} task={task}></Task>
          ))
          }
          </div>
        </SortableContext>
    </div>
  );
};

export default Column;