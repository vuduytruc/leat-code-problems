
var calculateTax = function(brackets, income) {
    for (let i = brackets.length-1; i >= 1; --i) {
        brackets[i][0] -= brackets[i-1][0];
    }

    let tax = 0;

    for (let i = 0; i < brackets.length; ++i) {
        const b = brackets[i];
        tax += Math.min(income, b[0]) * b[1];
        income -= b[0];
        if (income <= 0)
            break;
    }

    return tax/100;
};
