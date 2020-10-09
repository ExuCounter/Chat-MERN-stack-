const isValidUsername = (value) => {
    const username = value;
    if (!username.includes(' ')) {
        return true;
    } else {
        return false;
    }
}

export {
    isValidUsername
}