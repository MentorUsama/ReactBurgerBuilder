import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

class Checkout extends Component {

    componentWillMount (){
        this.props.onInitPurchase();
    }
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            const purchaseRedirect=this.props.purchase? <Redirect to='/' />:null;
            summary =
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
        }
        return (
            summary 
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchase:state.orders.purchased
    };
}
const mapDispatchToProps=dispatch=>{
    return {
        onInitPurchase:()=>dispatch(action.purchaseInit)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);