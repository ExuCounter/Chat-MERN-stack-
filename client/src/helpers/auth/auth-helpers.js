const isValidUsername = (value) => {
    const username = value;
    console.log(username);
    if (!username.includes(' ')) {
        console.log('Username valid');
        return true;
    } else {
        console.log('Username invalid')
        return false;
    }
}

export {
    isValidUsername
}