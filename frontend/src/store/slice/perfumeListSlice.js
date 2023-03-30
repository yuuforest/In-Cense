import { createSlice } from "@reduxjs/toolkit";

export const perfumeListSlice = createSlice({
  name: 'perfumeList',
  initialState: {
    perfumeList:[]

  },
  reducers: {
    getPerfumeList: (state, {payload}) => {
      console.log('List get요청')
      state.perfumeList = payload
    }
  }
})

export const perfumeListReducers = perfumeListSlice.reducer;
export const perfumeListActions = perfumeListSlice.actions;