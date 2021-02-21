import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building:false 
}





const addIngredient=(state,action)=>{
    const updatedIngredients =
    {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building:true
    }
    return updateObject(state, updatedState)
}
const removeIngredient=(state,action)=>{
    const updatedIngredients =
    {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building:true
    }
    return updateObject(state, updatedState)
}
const setIngredient=(state,action)=>{
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building:false
    })
}
const fetchIngredientsFailed=(state,action)=>{
    return updateObject(state, {
        error: true
    })
}





const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state,action)
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state,action);
        default:
            return state;
    }
}
export default reducer;