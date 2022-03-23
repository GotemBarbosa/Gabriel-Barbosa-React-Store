

const INITIAL_STATE = {
    // cartItems: localStorage.getItem('CART')?JSON.parse(localStorage.getItem('CART')):[]
    cartItems: []
}
export default function cart(state = INITIAL_STATE, action){
    if(action.type === "ADD_TO_CART"){
        // localStorage.setItem('CART', JSON.stringify([...state.cartItems, action.product]))
        // console.log(JSON.parse(localStorage.getItem('CART')))
        return{
            ...state,
            cartItems: [...state.cartItems, action.product]
        }
    }
    if(action.type === "UPDATE_QUANTITY"){
        // console.log(JSON.parse(localStorage.getItem('CART')))
        return {
            ...state, cartItems: state.cartItems.map((cartItem, i)=> i === action.cartItemId ?{...cartItem, quantity :action.newQuantity}:cartItem)
        }
    }
    if(action.type === 'DELETE_IN_CART'){
        return{
            cartItems:[
            ...state.cartItems.filter(cartItem => cartItem !== action.cartItem)]
        }
    }
    return state
}

