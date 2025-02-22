
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  const{_id} = task
  console.log(_id);

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

      <Link to={`/update-task/${_id}`} className="p-2 bg-[#D2B48C] rounded-md text-white inline-block">Edit</Link>
    </div>
  );
};

export default Task;
