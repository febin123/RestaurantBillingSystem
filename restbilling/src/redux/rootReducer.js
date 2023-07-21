const initalState={
    loading:false,
    cartItems:[]
}

export const rootReducer=(state=initalState,action)=>{
    switch(action.type){
        default:
            return state
    }
}