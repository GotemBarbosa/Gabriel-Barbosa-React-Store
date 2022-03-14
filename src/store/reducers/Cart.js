const INITIAL_STATE = {
    cartItems: []
}

export default function cart(state = INITIAL_STATE, action){
    if(action.type === "ADD_TO_CART"){
        return {cartItems: [...state.cartItems, action.product]}
    }
    return state
}

