import TableData from "./components/tableData.tsx";
import CreateVehicle from "./components/createVehicle.tsx";
import {useEffect} from "react";
import {getAllVehicle} from "./store/thunk/vehicle_thunk.ts";
import toast from "react-hot-toast";
import {useAppDispatch, useAppSelector} from "./store";
import Loader from "./components/Loader.tsx";
import {setError, setMessage} from "./store/slice/vehicle_slice.ts";

function App() {



    const {isLoading,isError,isMessage,Data} = useAppSelector((state) => state.vehicle);

    const dispatch= useAppDispatch()

    useEffect(() => {
        if (isMessage) {
            toast.success(isMessage);
            dispatch(setMessage(""))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMessage]);

    useEffect(() => {
        if (isError) {

            toast.error(isError);
            dispatch(setError(""))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);



    useEffect(() => {
        dispatch(getAllVehicle())
    }, [dispatch]);

  return (
      <div className="mx-auto max-w-screen-xl px-4 py-32 flex flex-col h-screen items-center">
          <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <CreateVehicle/>

                  {
                      isLoading ? (
                          <>
                              <Loader/>
                          </>
                      ) : (
                          <TableData data={Data?.data}/>
                      )
                  }


              </div>
          </div>
      </div>

  )
}

export default App
