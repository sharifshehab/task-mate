
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQueryClient } from "@tanstack/react-query";

const Task = ({ task }) => {
  const { _id } = task;
  const queryClient = useQueryClient();
  const axios = useAxiosPublic();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: task._id
    })

    const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteTask = (event, id) => {
    event.stopPropagation();
    
      axios.delete(`/tasks/${id}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
                         queryClient.invalidateQueries(['tasks']);
                      }
      })
    };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className=" bg-white p-4 shadow-sm hover:shadow-md text-center space-y-3"
      style={style}
    >
      <h4 className="text-lg text-blue-500 capitalize">{task.title}</h4>

      <div className="text-center space-x-2">
        <Link to={`/update-task/${_id}`} className="p-2 bg-blue-500 hover:bg-blue-400 text-white inline-block">Edit</Link>

        <button onClick={(event)=> deleteTask(event,_id)} className="p-2 bg-red-500 hover:bg-red-400 text-white inline-block">Delete</button>
    </div>

    </div>
  );
};

export default Task;
