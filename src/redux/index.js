import { configureStore } from "@reduxjs/toolkit";
import statisticsSlice, { fetchData } from "./slice/statisticsSlice";

const store = configureStore({
    reducer:{
        DashBoard: statisticsSlice.reducer,
    }
})

export default store;