export const numberValidation = (event) => {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

export const maxDate = () => {
    var d = new Date();
    d.setFullYear(d.getFullYear()-18, d.getMonth());
    return d.toISOString().split('T')[0];
}

export const memberMaxDate = () => {
    var d = new Date();
    return d.toISOString().split('T')[0];
}


export const emailValid = (event) => {
    const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

export const OnKeyPressUserhandler = (event) => {
    const pattern = /^[a-zA-Z ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

export const panCardValidation = (e) => {
    const pattern = /^[a-zA-Z0-9]+$/;
    let inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
        e.preventDefault();
    }
}

export const bankValidation = (e) => {
    const pattern = /^[a-zA-Z0-9_, ]+$/;
    let inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
        e.preventDefault();
    }
}

export const ifscValidation = (e) => {
    const pattern = /^[a-zA-Z0-9]+$/;
    let inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
        e.preventDefault();
    }
}

export const fNameKeyPress = (event) => {
    const pattern = /^[a-zA-Z]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

