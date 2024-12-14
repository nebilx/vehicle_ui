import {configureStore, ThunkAction,Action} from "@reduxjs/toolkit";
import vehicleReducer from '../store/slice/vehicle_slice.ts'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

 const store = configureStore({
    reducer:{
        vehicle:vehicleReducer
    }

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store