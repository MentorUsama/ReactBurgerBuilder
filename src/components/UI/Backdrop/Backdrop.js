import React from 'react';
import classes from './Backdrop.module.css';
import Classes from './Backdrop.module.css';

const backdrop=(props)=>(
    props.show?
    <div className={classes.BackDrop} onClick={()=>props.clicked()}>

    </div>
    :
    null
);
export default backdrop;