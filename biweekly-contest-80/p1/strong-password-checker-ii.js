var strongPasswordCheckerII = function(password) {
    if (password.length < 8)
        return false;

    password = password.split('')

    if (!password.some(c => _isDigit(c)))
        return false;
    if (!password.some(c => _isLower(c)))
        return false;
    if (!password.some(c => _isUpper(c)))
        return false;
    if (!password.some(c => _isSpecial(c)))
        return false;

    for (let i = 1; i < password.length; ++i) {
        if (password[i] === password[i-1])
            return false;
    }

    return true;
};

function _isLower(c) {
    return 'a' <= c && c <= 'z';
}

function _isUpper(c) {
    return 'A' <= c && c <= 'Z';
}

function _isDigit(c) {
    return '0' <= c && c <= '9';
}

function _isSpecial(c) {
    return '!@#$%^&*()-+'.includes(c);
}
