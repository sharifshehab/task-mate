import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const UpdateTask = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const axios = useAxiosPublic();
    const { user } = useAuth();
    const { _id, title, status } = useLoaderData();
    const navigate = useNavigate();
    
    useEffect(() => {
        setValue("title", title);
        setValue("status", status);
    },[title,status,setValue])

    const onSubmit = data => {

        const updateTask = {
                title: data.title,
                status: data.status,
                timestamp: new Date().toISOString()
        }

        axios.put(`/tasks/${_id}`, updateTask)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    navigate('/');
                    reset();
                }
        })
    };
    return (
         <>
        
                    <div
                        className={`w-full h-screen fixed top-0 left-0 z-[200000000] bg-blue-500 transition-all duration-300 flex items-center justify-center`}
                    >
                        <div
                            className={`w-[90%] sm:w-[80%] md:w-[35%] bg-[#fff] transition-all duration-300 mx-auto mt-8`}
                        >
                            <div
                                className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
                                <h1 className="text-[1.5rem] font-bold">
                                    Update Task
                                </h1>
                                
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
                                defaultValue={status}
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
                                   Update Task
                                </button>
                            </form>
        
                        </div>
                    </div>
                </>
    );
};

export default UpdateTask;