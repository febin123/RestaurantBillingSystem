const initalState={
    loading:false,
    cartItems:[]
}

export const rootReducer=(state=initalState,action)=>{
    switch(action.type){
        case "updateTable":
            return{
                ...state,
                cartItems:[...state.cartItems,action.payload], 
            }
        default:
            return state
    }
}