import { closestCorners, DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Column from "../../components/Column";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { io } from "socket.io-client";
import Task from "../../components/Task";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const socket = io.connect("http://localhost:5000/");

const Home = () => {
  const axios = useAxiosPublic();

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get('')
      return res.data;
    }
  });
  
    // data
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
    // const [tasks, setTasks] = useState([
    //     {id: 1, title: "Title 1"},
    //     {id: 2, title: "Title 2"},
    //     {id: 3, title: "Title 3"}
    // ])
  
    useEffect(() => {
      // Fetch tasks on component mount
      fetch("http://localhost:5000/tasks")
        .then((res) => res.json())
        .then((data) => setTasks(data));
      
        

      // Listen for real-time updates
      // socket.on("taskUpdated", (task) => {
      //   setTasks((prevTasks) => {
      //     const existingTaskIndex = prevTasks.findIndex(
      //       (t) => t._id === task._id
      //     );
      //     if (existingTaskIndex >= 0) {
      //       const updatedTasks = [...prevTasks];
      //       updatedTasks[existingTaskIndex] = task;
      //       return updatedTasks;
      //     } else {
      //       return [...prevTasks, task];
      //     }
      //   });
      // });

      // socket.on("taskDeleted", (taskId) => {
      //   setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
      // });

      // return () => {
      //   socket.disconnect();
      // };
    }, []);
  
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
    
  const handleDragEnd = event => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    } );
    
  }

    return (
      <div>
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <Task key={task._id} task={task} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    );
};

export default Home;