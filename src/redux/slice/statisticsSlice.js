import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const statisticsSlice = createSlice({
    name: "dashboard",
    initialState: {
        values:[],
        data:{
            user:[{
                week1:100,
                week2:400,
                week3:200,
                week4:400
            }],
            guest:[{
                week1:100,
                week2:450,
                week3:100,
                week4:350
            }],
            pie:[{
                tees :35,
                pants :20,
                shorts :45
            }],
            stats:[{
            revenue:876243,
            transctions:1316
            }]},
        defaultMonth:"2023-01",
        status:"pending",
        error:null
    },
    reducers:{
        filteredData : (state,action)=>{
            state.data = action.payload
        }
    },
    extraReducers: builder => builder.addCase(fetchData.pending,(state, action)=>{
        state.status = "pending";
    })
    .addCase(fetchData.rejected,(state, action)=>{
        state.status = "rejected";
        state.error = action.payload
    })
    .addCase(fetchData.fulfilled,(state, action)=>{
        state.status = "fulfilled";
        state.values = action.payload;
        state.data = action.payload[0];
    })
});

export const fetchData = createAsyncThunk("Dashbord/fetch", async()=>{
    try {
        const {data} = await axios.get("https://dashboard-api-2023-4tca.onrender.com/dashboard/getData");
            return data;

    } catch (error) {
        return error.message
    }
})

export const {filteredData} = statisticsSlice.actions;
export default statisticsSlice;