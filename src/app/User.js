import { createSlice } from "@reduxjs/toolkit";


const initialState={
	user: null,
}
const userSlice=createSlice({
	name:'user',
	initialState,
	reducers:{
		userLogin:(state)=>{
			state.user=localStorage.getItem('access_token')
		},
		userLogout:(state)=>{
			state.user=null;
			localStorage.removeItem('access_token')
		}
	}
})

export const {userLogin,userLogout}=userSlice.actions
export default userSlice.reducer