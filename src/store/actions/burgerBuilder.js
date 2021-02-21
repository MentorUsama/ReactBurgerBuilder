import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName:name
    }
}
export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:name
    }
}

export const fetchIngredientsFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const initIngredients=()=>{
    return dispatch=>{
        axios.get('https://burger-b4810-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        }).catch((error) => {
            dispatch(fetchIngredientsFailed());
        })
    }
}