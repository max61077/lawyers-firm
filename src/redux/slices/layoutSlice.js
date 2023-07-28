import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toast: {
        show: true,
        msg: 'Success',
        type: 'success',
        duration: 5000
    }
}

const layoutSlice = createSlice({
    name: 'layoutSlice',
    initialState,
    reducers: {
        toggleToast: (state, action) => {
            state.toast = {
                ...state.toast,
                ...action.payload
            }
        }
    }
})

export const { toggleToast } = layoutSlice.actions

export default layoutSlice.reducer