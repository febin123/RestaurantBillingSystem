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
            case "deleteTable":
                return{
                    ...state,
                    cartItems:state.cartItems.filter((item)=>item._id !== action.payload._id ) 
                }
        case "UPDATE":
            return{
                ...state,
                cartItems:state.cartItems.map(item=>item._id === action.payload._id ? {...item,quantity:action.payload.quantity}:item)
            }
        
        case "showLoading": return{
            ...state,
            loading:true
        }
        case "hideLoading": return{
            ...state,
            loading:false
        }
        default:
            return state
    }
}