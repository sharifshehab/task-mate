import {useState} from "react";
import { useForm } from "react-hook-form";
// react icons
import { RxCross1 } from "react-icons/rx";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const AddForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axios = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const onSubmit = data => {
        const newTask = {
                user: user?.email,
                title: data.title,
                status: data.status,
                timestamp: new Date().toISOString()
        }

        axios.post('/tasks', newTask)
            .then(res => {
                if (res.data.insertedId) {
                    setIsModalOpen(false);
                    queryClient.invalidateQueries(['tasks']);
                    reset();
                }
        })
    };


    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    
    return (
        <>
            <div className="text-center">
                <button onClick={handleModal} className="px-4 py-2 bg-blue-500 my-5 text-white hover:bg-blue-400">Add Task</button>
            </div>

            <div
                className={`${
                    isModalOpen ? " visible" : " invisible"
                } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
            >
                <div
                    className={`${
                        isModalOpen
                            ? " scale-[1] opacity-100"
                            : " scale-[0] opacity-0"
                    } w-[90%] sm:w-[80%] md:w-[35%] bg-[#fff]  transition-all duration-300 mx-auto mt-8`}
                >
                    <div
                        className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
                        <h1 className="text-[1.5rem] font-bold ">
                            Add New Task
                        </h1>
                        <RxCross1
                            className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        />
                    </div>

                    <form className="flex flex-col gap-5 p-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label
                                htmlFor="text"
                                className="text-[1rem] font-[500] text-[#464646]"
                            >
                                Task Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Write task title "
                                className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                                {...register("title", { required: "Title is required", maxLength: {value: 50, message: "Max title length is 50 characters"} })}
                                />
                                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                        </div>

                        <div>
                            <label
                                htmlFor="text"
                                className="text-[1rem] font-[500] text-[#464646]"
                            >
                                Task Status
                            </label>
                            <select
                                name="status"
                                id="status"
                                className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                                {...register("status", { required: "Status is required"})}
                            >
                                <option value="">Select Status</option>
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                                {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="py-2 px-4 w-full bg-blue-500 text-[#fff]"
                        >
                           Add Task
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default AddForm;