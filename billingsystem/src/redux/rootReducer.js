import { type } from "server/reply"

const intialState={
    loading:false,
    cartItems:[]
}
export const rootReducer=(state=intialState,action)=>{
    switch(action,type){
        default:
            return state;
    }
}