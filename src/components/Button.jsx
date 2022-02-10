import React, { useContext, } from 'react';

import { MyContext } from './Display';




function Button() {

    let { onButtonClickHandler } = useContext(MyContext)

    // const size = [1, 2, 3]


    return (
        <div>

        {/* <p> hemant </p> */}
    
        {/* <button id="button" onClick={ () => onButtonClickHandler()} > empty button </button> */}
        
        {/* {
        size.map( (number) => {
            return (
                <ul key={number}>
                </ul>
            )
        })
        } */}

      </div>
    )
}

export default Button;
