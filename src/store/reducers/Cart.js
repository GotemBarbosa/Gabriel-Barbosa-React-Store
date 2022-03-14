const INITIAL_STATE = {
    cartItems: []
}

export default function cart(state = INITIAL_STATE, action){
    if(action.type === "ADD_TO_CART"){
        return {cartItems: [...state.cartItems, action.product]}
    }
    if(action.type === "UPDATE_QUANTITY"){
        console.log(state)
        return {cartItems:[...state.cartItems, state.cartItems[action.cartItemId].quantity = action.newQuantity]}
    }
    return state
}

