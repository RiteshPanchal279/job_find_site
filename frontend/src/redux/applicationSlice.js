import { createSlice } from "@reduxjs/toolkit";
export const applicationSlice = createSlice({
   name:"application",
   initialState:{
     applicants:[]
   },
   reducers:{
      // actions
      setApplicants:(state,action)=>{
         state.applicants = action.payload;
      },
      
   }
})
export const {setApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;