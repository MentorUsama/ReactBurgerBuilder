import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/Auth';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject,checkValidity} from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp:true,
    }


    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/')
        {
            this.props.onSetAuthRedirectPath()
        }
    }





    inputChangedHandler = (event, controlName) => {
        const updatedControls =updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        }) 
        this.setState({controls:updatedControls})
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    switchAuthModeHandler=()=>{
        this.setState((prevState)=>({isSignUp:!prevState.isSignUp}));
    }
    render() {

        // Input related data goes here
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementArray.map((formElement) => {
            return <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />
        })

        if(this.props.loading)
        {
            form=<Spinner />
        }
        let errorMessage=null;
        if(this.props.error)
        {
            errorMessage=<p>{this.props.error.message}</p>;
        }

        let authRedirect=null;
        if(this.props.isAuthenticated)
        {
            authRedirect=<Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={classes.ContactData}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    btnType='Danger' 
                    clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignUp?"SignIn":"SignUp"}</Button>

            </div>
        );
    }
}

const mapDispatchToPtops=dispatch=>{
    return {
        onAuth: (email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}
const mapStateToPtops=state=>{
    return {
       loading:state.auth.loading,
       error:state.auth.error,
       isAuthenticated:state.auth.token!==null,
       buildingBurger:state.burgerBuilder.building,
       authRedirectPath:state.auth.authRedirectPath
    }
}

export default connect(mapStateToPtops,mapDispatchToPtops)(Auth);