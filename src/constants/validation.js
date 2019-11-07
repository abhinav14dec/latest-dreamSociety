import React from 'react';


  const onKeyPresshandler=(event) =>{
    // /^[^-\s][a-zA-Z\_\- ]*$/;

    const pattern = /^[^-\s][a-zA-Z0-9_\s-]*$/;
   
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

export default onKeyPresshandler;