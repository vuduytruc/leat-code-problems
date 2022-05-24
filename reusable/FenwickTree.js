class FT {
    constructor(n) {
        this.data = new Array(n + 1).fill(0);
    }

    getParent(i) {
        return i - (i & (-i));
    }

    getNext(i) {
        return i + (i & (-i));
    }

    getMax(i) {
        let max = this.data[i];
        ++i;
        while (i > 0) {
            if (this.data[i] > max) {
                max = this.data[i];
            }
            i = this.getParent(i);
        }
        return max;
    }

    update(i, v) {
        ++i;
        while (i < this.data.length) {
            if (this.data[i] < v) {
                this.data[i] = v;
            }
            i = this.getNext(i);
        }
    }
}