/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var digitSum = function(s, k) {
    while (s.length > k) {
        let newStr = "";

        for (let i = 0; i < s.length; i += k) {
            let sum = 0;

            for (let j = i; j < i + k && j < s.length; j++) {
                sum += Number(s[j]);
            }

            newStr += sum;
        }

        s = newStr;
    }

    return s; 
};