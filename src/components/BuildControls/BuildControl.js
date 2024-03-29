import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
]
const Control=(props)=>(
    <div className={classes.BuildControls}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>
            <BuildControl disabled={props.disabled[ctrl.type]} key={ctrl.label} label={ctrl.label} ingredientsAdded={props.ingredientsAdded} type={ctrl.type} ingredientsRemoved={props.ingredientsRemoved}/>
        )}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchaseable}
            onClick={props.ordered} >{props.isAuth?'ORDER NOW':'SIGNUP TO ORDER'}</button>
    </div>
);
export default Control;