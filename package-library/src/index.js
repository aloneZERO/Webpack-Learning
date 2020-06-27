/**
 * 大整数加法
 * @param {string} a 加数
 * @param {string} b 加数
 */
module.exports = function add(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;

    let carry = 0; // 进位
    let ans = '';

    while (i >= 0 || j >= 0) {
        let x = 0;
        let y = 0;
        let sum;

        if (i >= 0) {
            x = Number(a[i]);
            i--;
        }

        if (j >= 0) {
            y = Number(b[j]);
            j--;
        }

        sum = x + y + carry;

        if (sum >= 10) {
            carry = 1;
            sum -= 10;
        } else {
            carry = 0;
        }

        ans = sum + ans;
    }

    if (carry) {
        ans = carry + ans;
    }

    return ans;
}
