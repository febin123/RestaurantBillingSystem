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
        case "UPDATE":
            return{
                ...state,
                cartItems:state.cartItems.map(item=>item._id === action.payload._id ? {...item,quantity:action.payload.quantity}:item)
            }
        default:
            return state
    }
}