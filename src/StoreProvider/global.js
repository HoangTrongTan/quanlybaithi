import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    danhsachFiles: [],
}
export const GlobalSlice = createSlice({
    name:'global',
    initialState,
    reducers:{
        setDanhSachFiles: (state,action) => {
            state.danhsachFiles = action.payload;
        }
    }
});

export const { setDanhSachFiles } = GlobalSlice.actions; 
export default GlobalSlice.reducer;