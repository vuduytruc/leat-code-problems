
var totalSteps = function(nums) {
    const n = nums.length;

    const ms = new MS(n);
    let root = nums[0];

    let max = 0;

    for (let i = 1; i < n; ++i) {
        const num = nums[i];

        if (num >= root) {
            ms.clear();
            root = num;
            continue;
        }

        const height = ms.push(num);
        if (height > max) {
            max = height;
        }
    }

    return max;
};


/// stack: des by value and height
class MS {
    constructor(n) {
        this.stack = new Array(n).fill(-1);
        this.height = new Array(n).fill(-1);
        this.idx = -1;
    }

    isEmpty() {
        return this.idx < 0;
    }

    clear() {
        this.idx = -1;
    }

    /// return [lastElement, lastHeight] if stack is not empty
    /// return null if stack is empty
    /// NOTE, side effect: remove last element
    pop() {
        const result = this.last();
        this.removeLast();
        return result;
    }

    /// return [lastElement, lastHeight] if stack is not empty
    /// return null if stack is empty
    last() {
        if (this.isEmpty()) {
            return null;
        } else {
            const e = this.stack[this.idx];
            const h = this.height[this.idx];
            return [e, h];
        }
    }

    /// if successfully remove last element, return true, else return false
    removeLast() {
        if (this.isEmpty()) {
            return false;
        } else {
            --this.idx;
            return true;
        }
    }

    /// return lastHeight
    _push(element, height) {
        ++this.idx;
        this.stack[this.idx] = element;
        this.height[this.idx] = height;
        return height;
    }

    /// return lastHeight
    push(element) {
        let height = 1;

        if (this.isEmpty()) {
            this._push(element, height);
            return height;
        }

        let found = false;
        do {
            const [lastElement, lastHeight] = this.last();

            if (lastElement <= element) {
                if (lastHeight + 1 > height) {
                    height = lastHeight + 1;
                }
                this.removeLast();
                continue;
            }

            if (lastHeight <= height) {
                this.removeLast();
                continue;
            }

            found = true;
        } while (!this.isEmpty() && !found);

        this._push(element, height);
        return height;
    }
}

