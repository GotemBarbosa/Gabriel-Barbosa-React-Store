const INITIAL_STATE = {
    activeCurrency: 0,
    activeCurrencySymbol: localStorage.getItem("FIRST_CURRENCY")
}

export default function currency(state = INITIAL_STATE, action){
    if(action.type === "CHANGE_CURRENCY"){
        return { 
            ...state, activeCurrency: action.currency, activeCurrencySymbol: action.symbol
        }
    }
    return state
}

