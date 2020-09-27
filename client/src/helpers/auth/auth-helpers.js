const isValidEmail = (email) => {
    if (email.match((/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))) {
        console.log('Email valid');
        return true;
    } else {
        console.log('Email invalid')
        return false;
    }
}

export {
    isValidEmail
}