import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Column from "../../components/Column";
import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import AddForm from "../../components/AddForm";


const Home = () => {
  const COLUMNS = [
    {id: "TODO", title: "To Do"},
    {id: "IN_PROGRESS", title: "In Progress"},
    {id: "DONE", title: "Done"}
  ]

  const axios = useAxiosPublic();
  const { data: InitialTasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/tasks");
      return res.data;
    },
  });


  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (InitialTasks.length > 0) {
      setTasks(InitialTasks)
    }
  },[InitialTasks])

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setTasks((prevTasks) => {
      const activeTask = prevTasks.find(task => task._id === activeId);

      if (!activeTask) return prevTasks;
      const updatedTasks = prevTasks.filter(task => task._id !== activeId);
      const targetColumn = COLUMNS.find(col => col.id === overId);

      if (targetColumn) {
        updatedTasks.push({ ...activeTask, status: overId });
      } else {
        const overIndex = updatedTasks.findIndex(task => task._id === overId);
        updatedTasks.splice(overIndex, 0, activeTask);
      }
      return updatedTasks;
    });
  }


  return <>
    <AddForm></AddForm>
    <DndContext onDragEnd={handleDragEnd}>
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
