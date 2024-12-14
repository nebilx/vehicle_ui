import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { payloadCreateType} from "../types";
import toast from "react-hot-toast";
import {addVehicle, getAllVehicle} from "../store/thunk/vehicle_thunk.ts";
import {setSuccess} from "../store/slice/vehicle_slice.ts";
import {useAppDispatch, useAppSelector} from "../store";

const CreateVehicle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {isLoading,isSuccess,isMessage} = useAppSelector((state) => state.vehicle);

    const dispatch= useAppDispatch()


    useEffect(() => {
        if (isSuccess && isMessage !== '') {

            dispatch(setSuccess(false));
            dispatch(getAllVehicle())
            setIsOpen(false);
        } else if(isSuccess === false){
            setIsOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isMessage, toast]);



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<payloadCreateType>({
        defaultValues: {
            name: '',
            status: true,
        },
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const onSubmit = (data:payloadCreateType) => {
        dispatch(addVehicle(data))
    };


    return (
        <>
            <div className="relative flex justify-center">

                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors
            duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring
            focus:ring-blue-300 focus:ring-opacity-80"
                >
                    Register Vehicle
                </button>


                {isOpen && (
                    <div
                        className="fixed inset-0 z-10 overflow-y-auto"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
              >
                &#8203;
              </span>

                            <div
                                className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                            >
                                <div>
                                    <div className="flex items-center justify-center">

                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="w-8 h-8 text-gray-700 dark:text-gray-300" viewBox="0 0 16 16">
                                            <path fill="currentColor"
                                                  d="m11.776 6.5l-.135-.048l-1.135-2.128A2.5 2.5 0 0 0 8.3 3H5.442A2.5 2.5 0 0 0 3.07 4.71l-.541 1.623A2.5 2.5 0 0 0 1 8.637V9.75c0 .71.423 1.32 1.03 1.595a2 2 0 0 0 3.907.155h4.126a2 2 0 0 0 3.907-.155A1.75 1.75 0 0 0 15 9.75v-.339a2.5 2.5 0 0 0-1.662-2.355l-1.51-.537V6.5zM5.442 4H6.5v2.5H3.527l.491-1.474A1.5 1.5 0 0 1 5.442 4M7.5 4h.8a1.5 1.5 0 0 1 1.324.794l.91 1.706H7.5zm4.103 3.5l1.4.498A1.5 1.5 0 0 1 14 9.411v.339c0 .175-.06.336-.16.464a2 2 0 0 0-3.777.286H5.937a2 2 0 0 0-3.777-.286A.75.75 0 0 1 2 9.75V8.637c0-.45.2-.86.52-1.137zM3 11a1 1 0 1 1 2 0a1 1 0 0 1-2 0m9-1a1 1 0 1 1 0 2a1 1 0 0 1 0-2"/>
                                        </svg>
                                    </div>

                                    <div className="mt-2 ">
                                        <h3
                                            className="text-lg font-medium leading-6 text-center text-gray-800 capitalize dark:text-white"
                                            id="modal-title"
                                        >
                                            Register Vehicle
                                        </h3>

                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                                            <div>
                                                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                                    Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="username"
                                                    type="text"
                                                    {...register("name", {required: "name is required"})}
                                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                                )}
                                            </div>

                                            <div className="mt-2">
                                                <label
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Select an option <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <label
                                                        className="flex items-center text-gray-700 dark:text-gray-300">
                                                        <input
                                                            type="radio"
                                                            value="true"
                                                            {...register("status", {required: "This field is required"})}
                                                            className="text-blue-600 focus:ring-blue-500 focus:ring-opacity-40 dark:focus:ring-blue-400"
                                                        />
                                                        <span className="ml-2">True</span>
                                                    </label>
                                                    <label
                                                        className="flex items-center text-gray-700 dark:text-gray-300">
                                                        <input
                                                            type="radio"
                                                            value="false"
                                                            {...register("status", {required: "This field is required"})}
                                                            className="text-blue-600 focus:ring-blue-500 focus:ring-opacity-40 dark:focus:ring-blue-400"
                                                        />
                                                        <span className="ml-2">False</span>
                                                    </label>
                                                </div>
                                                {errors.status && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
                                                )}
                                            </div>



                                    <div className="sm:flex mt-5 items-center justify-around">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide
                            text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200
                            rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700
                            dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300
                            focus:ring-opacity-40"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            disabled={isLoading}
                                            type={"submit"}
                                            className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        >
                                            {isLoading ? (
                                                <>

                                                    Loading
                                                </>
                                            ) : (
                                                <>
                                                   Add
                                                </>
                                            )}
                                        </button>
                                    </div>


                            </form>

                        </div>
                    </div>



                    </div>
                    </div>

            </div>

                    )}
                    </div>

        </>
    );
};

export default CreateVehicle;
