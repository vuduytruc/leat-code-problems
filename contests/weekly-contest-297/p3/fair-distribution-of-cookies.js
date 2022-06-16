
var distributeCookies = function(cookies, k) {
    const N = cookies.length;

    let temp = new Array(k).fill(0);
    let tempAssign = new Array(N).fill(k-1);

    let rs;

    for (let i = 0; i < N; ++i) {
        temp[i] = 0;
    }
    for (let i = 0; i < N; ++i) {
        temp[tempAssign[i]] += cookies[i];
    }
    rs = Math.max(...temp);

    let pos;
    let v = 0;
    let stop = false;
    while (true) {
        pos = N-1;
        --tempAssign[pos];
        while (tempAssign[pos] < 0) {
            tempAssign[pos] = k-1;
            --pos;
            if (pos < 0) {
                stop = true;
                break;
            } else {
                --tempAssign[pos];
            }
        }

        if (stop)
            break;

        for (let i = 0; i < N; ++i) {
            temp[i] = 0;
        }
        for (let i = 0; i < N; ++i) {
            temp[tempAssign[i]] += cookies[i];
        }
        v = Math.max(...temp);
        if (v < rs)
            rs = v;
    }

    return rs;
};
