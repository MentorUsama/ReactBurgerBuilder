import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';

const BurgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div data-testid='BurgerIngredient' className={classes.BreadBottom}></div>
            break;
        case ('bread-top'):
            ingredient =
                (
                    <div data-testid='BurgerIngredient' className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
            break;
        case ('meat'):
            ingredient = <div data-testid='BurgerIngredient' className={classes.Meat}></div>
            break;
        case ('cheese'):
            ingredient = <div data-testid='BurgerIngredient' className={classes.Cheese}></div>
            break;
        case ('salad'):
            ingredient = <div data-testid='BurgerIngredient' className={classes.Salad}></div>
            break;
        case ('bacon'):
            ingredient = <div data-testid='BurgerIngredient' className={classes.Bacon}></div>
            break;
        default:
            ingredient=null;
    }

    return ingredient;
}

BurgerIngredient.propTypes={
    type: PropTypes.string.isRequired
};
export default BurgerIngredient;