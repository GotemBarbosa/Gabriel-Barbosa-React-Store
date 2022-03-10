const INITIAL_STATE = {
    activeCurrency: 0,
}

export default function currency(state = INITIAL_STATE, action){
    if(action.type === "CHANGE_CURRENCY"){
        return { ...state, activeCurrency: action.currency}
    }
    return state
}