import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Column from "../../components/Column";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import AddForm from "../../components/AddForm";


const Home = () => {
    

  // const axios = useAxiosPublic();
  // const { data: tasks = [] } = useQuery({
  //   queryKey: ["tasks"],
  //   queryFn: async () => {
  //     const res = await axios.get("/tasks");
  //     return res.data;
  //   },
  // });

  const COLUMNS = [
    {id: "TODO", title: "To Do"},
    {id: "IN_PROGRESS", title: "Progress"},
    {id: "DONE", title: "Done"}
  ]

  const InitialTasks = [
    { id: "1", title: "feature 1", desc: "desc 1", status: "TODO" },
    { id: "2", title: "feature 2", desc: "desc 2", status: "TODO" },
    { id: "3", title: "feature 3", desc: "desc 3", status: "DONE" },
    { id: "4", title: "feature 4", desc: "desc 4", status: "IN_PROGRESS" }
  ];

  const [tasks, setTasks] = useState(InitialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setTasks((prevTasks) => {
      const activeTask = prevTasks.find(task => task.id === activeId);

      if (!activeTask) return prevTasks;
      const updatedTasks = prevTasks.filter(task => task.id !== activeId);
      const targetColumn = COLUMNS.find(col => col.id === overId);

      if (targetColumn) {
        updatedTasks.push({ ...activeTask, status: overId });
      } else {
        const overIndex = updatedTasks.findIndex(task => task.id === overId);
        updatedTasks.splice(overIndex, 0, activeTask);
      }
      return updatedTasks;
    });
  }


  return <>
    <AddForm></AddForm>
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-4 bg-teal-950">
      {COLUMNS.map(column => (
        <Column key={column.id} column={column} tasks={tasks.filter((task)=>task.status === column.id)}></Column>
      ))
      }</div>
    </DndContext>
  </>;
};

export default Home;
