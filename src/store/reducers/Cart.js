const INITIAL_STATE = {
    cartItems: []
}

export default function cart(state = INITIAL_STATE, action){
    if(action.type === "ADD_TO_CART"){
        console.log(state)
        return{
            ...state,
            cartItems: [...state.cartItems, action.product]
        }
    }
    if(action.type === "UPDATE_QUANTITY"){
        return {
            ...state, cartItems: state.cartItems.map((cartItem, i)=> i === action.cartItemId ?{...cartItem, quantity :action.newQuantity}:cartItem)
        }
    }
    return state
}

