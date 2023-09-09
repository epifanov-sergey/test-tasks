/**
 * 2. Написать функцию, которая будет работать правильно при обоих вызовах,
 * как показано на приведенном коде
 */

function originalSum(a, b, c = 0) {
    return a + b + c;
}

function curry(func) {
    return function curried(...args) {
        const isCurried = this.args2 && this.args2.length;
        const curryLengthExceeded = isCurried && args.length > func.length;

        if (args.length >= func.length && (!isCurried || curryLengthExceeded)) {
            return func.apply({args, func}, args);
        } else {
            return function(...args2) {
                return curried.apply({args2, args, func}, args.concat(args2));
            }
        }
    };
}

const sum = curry(originalSum);

console.log(sum(2, 3)); // результат 5
console.log(sum(2)(3)(4)); // сумма всех элементов

