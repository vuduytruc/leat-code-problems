class MS {
    constructor(list) {
        this.next = new Array(list.length).fill(-1);
        let s = []; // stack
        for (let i = list.length-1; i >= 0; --i) {
            while (s.length && s[0] <= list[i]) {
                s.shift();
            }
            this.next[i] = s.length ? s[0] : -1;
            s.unshift(list[i]);
        }
    }

    getNext(i) {
        return this.next[i];
    }
}