import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';




class BurgerBuilder extends Component {

    state = {
        purchasing: false, // To show or hide model
    }


    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (updatedIngredient) => {
        const ingredients = { ...updatedIngredient };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        return sum > 0
    }


    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
            return;
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('./auth')
        }
    }


    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }


    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }

    render() {


        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        let Summary = null;
        let burger = this.props.error ? <p>Ingredient cant be loaded</p> : <Spinner />


        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.price}
                        ingredientsAdded={this.props.onIngredientsAdded}
                        disabled={disabledInfo}
                        ingredientsRemoved={this.props.onIngredientsRemoved}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            );
            Summary =
                <OrderSummary
                    ingredientSummary={this.props.ings}
                    purchasedCancelled={this.purchaseCancelHandler}
                    purchasedContinued={this.purchaseContinueHandler}
                    price={this.props.price}>
                </OrderSummary>
        }

        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {Summary}
                </Modal>
                {burger}

            </Aux>
        );
    };
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapDispatchProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchProps)(withErrorHandler(BurgerBuilder, axios));