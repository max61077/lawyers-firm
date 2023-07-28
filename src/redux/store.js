import { configureStore } from "@reduxjs/toolkit";
import lawyerReducer from "./slices/lawyerSlice";
import layoutReducer from './slices/layoutSlice'

const store = configureStore({
    reducer: {
        layout: layoutReducer,
        lawyer: lawyerReducer
    }
})

export default store