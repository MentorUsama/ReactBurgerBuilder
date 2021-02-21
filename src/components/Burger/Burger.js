import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const Burger=(props)=>{
    var transfrormedIngredients=Object.keys(props.ingredients)
    .map(igKey=>{
        return([...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        }))
    })
    .reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    if(transfrormedIngredients.length===0)
    {
        transfrormedIngredients=<p>Please Start Adding Ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transfrormedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
export default withRouter(Burger);