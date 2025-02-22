import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Column from "../../components/Column";
import { useEffect, useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import AddForm from "../../components/AddForm";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import useAuth from "../../hooks/useAuth";


const Home = () => {
  const { user } = useAuth();
  const COLUMNS = [
    {id: "TODO", title: "To Do"},
    {id: "IN_PROGRESS", title: "In Progress"},
    {id: "DONE", title: "Done"}
  ]

  const axios = useAxiosPublic();
  const { data: InitialTasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`/tasks/${user.email}`);
      return res.data;
    },
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (InitialTasks.length > 0) {
      setTasks(InitialTasks)
    }
  },[InitialTasks])

  const handleDragEnd = async(event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const activeTask = tasks.find(task => task._id !== activeId);
    if (!activeTask) return;
    const targetColumn = COLUMNS.find(col => col.id === overId);

    if (targetColumn) {
      await axios.patch(`/tasks/${activeId}`, { status: overId });

      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter(task => task._id !== activeId);
        updatedTasks.push({ ...activeTask, status: overId });
        return updatedTasks;
      });
      refetch();

    } else {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        const activeIndex = updatedTasks.findIndex(task => task._id === activeId);
        const overIndex = updatedTasks.findIndex(task => task._id === overId);
      

        if (activeIndex !== -1 && overIndex !== -1){
        const [removeTask] = updatedTasks.splice(activeIndex, 1);
        updatedTasks.splice(overIndex, 0, removeTask);
      }

      return updatedTasks;
    });
    }



  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),

  );


  return <>
    <AddForm></AddForm>
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between gap-10">
      {COLUMNS.map(column => (
        <Column key={column.id} column={column} tasks={tasks.filter((task)=>task.status === column.id)}></Column>
      ))
          }</div>
         </div>
    </DndContext>
  </>;
};

export default Home;
