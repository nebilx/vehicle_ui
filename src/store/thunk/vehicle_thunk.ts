import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {dataType, errorType, payloadCreateType, payloadMessageType, payloadUpdateType} from "../../types";

const url = "https://vehicle-api-12xy.onrender.com"

export const getAllVehicle = createAsyncThunk<dataType[], void, { rejectValue: errorType }>(
    "vehicle/get",
    async (_payload, thunkApi) => {
        try {
            const response: AxiosResponse<dataType[]> = await axios.get(`${url}/api/vehicle`);
            return response.data; // Return only the data (array of DataType)
        } catch (error: unknown) {
            // Ensure error is narrowed down to a known type
            if (axios.isAxiosError(error) && error.response) {
                return thunkApi.rejectWithValue({
                    message: error.response.data.error?.message || "Failed to fetch vehicle",
                    status: error.response.data.error?.status,
                });
            }


            return thunkApi.rejectWithValue({
                message: "An unknown error occurred.",
                status: 500,
            });

        }
    }
);


export const addVehicle = createAsyncThunk<payloadMessageType, payloadCreateType,{rejectValue:errorType}>(
    "vehicle/create",
    async (payload, thunkApi) =>{

    try {
        const response:AxiosResponse<payloadMessageType> = await axios.post(`${url}/api/vehicle`,payload)
        return response.data
    } catch (error: unknown) {

        console.log(error)
        // Ensure error is narrowed down to a known type
        if (axios.isAxiosError(error) && error.response) {
            return thunkApi.rejectWithValue({
                message: error.response.data.error?.message || "Failed to add vehicle",
                status: error.response.data.error?.status,
            });
        }


        return thunkApi.rejectWithValue({
            message: "An unknown error occurred.",
            status: 500,
        });

    }
})



export const updateStatus = createAsyncThunk<payloadMessageType,payloadUpdateType,{rejectValue:errorType}>(
    "vehicle/update",
    async (payload, thunkApi)=>{
    try {

        const response: AxiosResponse<payloadMessageType> = await axios.put(`${url}/api/vehicle/${payload.id}`, {status:payload.status})
        return response.data

    } catch (error: unknown) {
        // Ensure error is narrowed down to a known type
        if (axios.isAxiosError(error) && error.response) {
            return thunkApi.rejectWithValue({
                message: error.response.data.error?.message || "Failed to update vehicle status",
                status: error.response.data.error?.status,
            });
        }


        return thunkApi.rejectWithValue({
            message: "An unknown error occurred.",
            status: 500,
        });

}
})

