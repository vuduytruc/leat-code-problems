var discountPrices = function(sentence, discount) {
    const words = sentence.split(' ');
    const factor = 1.00 - discount/100;
    const numRex = /^\$[0-9]+(\.[0-9]+)?$/;
    words.forEach((w,i)=> {
        if (numRex.test(w)) {
            words[i] = '$' + (Number(words[i].slice(1)) * factor).toFixed(2);
        }
    });
    return words.join(' ');
};
