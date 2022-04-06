const INITIAL_STATE = {
  cartItems: localStorage.getItem("CART")
    ? JSON.parse(localStorage.getItem("CART"))
    : [],
};
export default function cart(state = INITIAL_STATE, action) {
  if (action.type === "ADD_TO_CART") {

    // if there is itens in cartItems
    if(state.cartItems.length !== 0){
        let sameSelectedAttributes = false;
        let sameSelectedAttributeIndex
        state.cartItems.map((cartItem, index)=>{
            if(cartItem.productId === action.product.productId){
                //look for same attributes
                const actionSorted = action.product.attributes.slice().sort()
                const cartItemSorted = cartItem.attributes.slice().sort()
                if(JSON.stringify(actionSorted) === JSON.stringify(cartItemSorted)){
                    sameSelectedAttributes = true;
                    sameSelectedAttributeIndex = index
                }
            }
            return null
        })

        if(sameSelectedAttributes){
          //update the cart quantity
            const quantitySteps = 1
            const newQuantity = state.cartItems[sameSelectedAttributeIndex].quantity + quantitySteps
            localStorage.setItem(
                "CART",
                JSON.stringify([
                  ...state.cartItems.map((cartItem, i) =>
                    i === sameSelectedAttributeIndex
                      ? { ...cartItem, quantity: newQuantity }
                      : cartItem
                  ),
                ])
              );
              return {
                cartItems: state.cartItems.map((cartItem, i) =>
                  i === sameSelectedAttributeIndex
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
                ),
              };
            
        }else{
            //add the new product to cart
            localStorage.setItem(
                "CART",
                JSON.stringify([...state.cartItems, action.product])
            );
            return {
            cartItems: [...state.cartItems, action.product],
            };
        }

    }else{
        localStorage.setItem(
        "CART",
        JSON.stringify([...state.cartItems, action.product])
        );
        return {
        cartItems: [...state.cartItems, action.product],
        };
    }
    
    
  }

  if (action.type === "UPDATE_QUANTITY") {
    localStorage.setItem(
      "CART",
      JSON.stringify([
        ...state.cartItems.map((cartItem, i) =>
          i === action.cartItemId
            ? { ...cartItem, quantity: action.newQuantity }
            : cartItem
        ),
      ])
    );
    return {
      cartItems: state.cartItems.map((cartItem, i) =>
        i === action.cartItemId
          ? { ...cartItem, quantity: action.newQuantity }
          : cartItem
      ),
    };
  }

  if (action.type === "DELETE_IN_CART") {
    localStorage.setItem(
      "CART",
      JSON.stringify([
        ...state.cartItems.filter((cartItem) => cartItem !== action.cartItem),
      ])
    );
    return {
      cartItems: [
        ...state.cartItems.filter((cartItem) => cartItem !== action.cartItem),
      ],
    };
  }

  if (action.type === "CLEAR_CART") {
    localStorage.setItem("CART", JSON.stringify([]));
    return {
      cartItems: [],
    };
  }
  return state;
}
