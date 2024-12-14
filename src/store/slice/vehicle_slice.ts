import { createSlice, Slice, PayloadAction } from "@reduxjs/toolkit";
import { addVehicle, getAllVehicle,updateStatus } from "../thunk/vehicle_thunk";
import {dataType, errorType, initType, payloadMessageType} from "../../types";



const initialState: initType = {
    Data: [],
    isLoading: false,
    isSuccess: false,
    isError: "",
    isMessage: "",
};

const vehicleSlice: Slice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = "";
            state.message = "";
            state.data = null;
        },
        setSuccess(state) {
            state.isSuccess=false
        },
        setMessage(state) {
            state.isMessage=""
        },
        setError(state) {
            state.isError=""
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(getAllVehicle.pending, (state) => {
                state.isLoading = true;
                state.isError = "";
            })
            .addCase(getAllVehicle.fulfilled, (state, action: PayloadAction<dataType[]>) => {
                state.isLoading = false;
                state.isError = "";
                state.isSuccess = true;
                state.Data = action.payload;
            })
            .addCase(getAllVehicle.rejected, (state, action: PayloadAction<errorType |undefined>) => {
                state.isLoading = false;
                state.isSuccess = false
                state.isError = action.payload?.message || "Error fetching vehicles.";
            })

            .addCase(addVehicle.pending, (state) => {
                state.isLoading = true;
                state.isError = "";
            })
            .addCase(addVehicle.fulfilled, (state, action: PayloadAction<payloadMessageType>) => {
                state.isLoading = false;
                state.isError = "";
                state.isSuccess = true;
                state.isMessage =  action.payload.message;
            })
            .addCase(addVehicle.rejected, (state, action: PayloadAction<errorType | undefined>) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = action.payload?.message || "Error adding vehicle.";
            })


            .addCase(updateStatus.pending, (state) => {
                state.isLoading = true;
                state.isError = "";
            })
            .addCase(updateStatus.fulfilled, (state, action: PayloadAction<payloadMessageType>) => {
                state.isLoading = false;
                state.isError = "";
                state.isSuccess = true;
                state.isMessage =  action.payload.message;
            })
            .addCase(updateStatus.rejected, (state, action: PayloadAction<errorType | undefined>) => {
                state.isLoading = false;
                state.isSuccess = false
                state.isError = action.payload?.message || "Error updating vehicle status.";
            });
    },
});

export const { setSuccess,setError,setMessage } = vehicleSlice.actions;

export default vehicleSlice.reducer;
