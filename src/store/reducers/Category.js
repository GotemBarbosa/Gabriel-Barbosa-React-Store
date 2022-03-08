const INITIAL_STATE = {
    activeCategory: 0,
    activeCategoryName: "all"
}

export default function category(state = INITIAL_STATE, action){
    if(action.type === "CHANGE_CATEGORY"){
        return { ...state, activeCategory: action.category , activeCategoryName: action.categoryName }
    }
    return state
}