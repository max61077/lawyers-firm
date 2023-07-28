import { createSlice } from "@reduxjs/toolkit";
import tableData from '../../data/db.json'

const initialState = {
    data: tableData
}

const lawyerSlice = createSlice({
    name: 'lawerSlice',
    initialState,
    reducers: {
        updateData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { updateData } = lawyerSlice.actions

export default lawyerSlice.reducer