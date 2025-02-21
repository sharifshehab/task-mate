
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: task._id
    })

  
    const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="cursor-grab bg-slate-400 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h4 className="text-lg">{task.title}</h4>
    </div>
  );
};

export default Task;
