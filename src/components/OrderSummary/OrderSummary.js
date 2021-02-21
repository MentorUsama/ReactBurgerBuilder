import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';

class orderSummary extends Component {

    // Could be functional
    componentDidUpdate(){

    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredientSummary)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredientSummary[igKey]}
                    </li>
                )
            })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredient:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchasedCancelled} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.purchasedContinued} btnType='Success'>CONTINUE</Button>
            </Aux>
        )
    };
}
export default orderSummary;