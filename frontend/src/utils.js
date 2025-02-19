export function percentDifference(a, b) {
    return  +(100 * Math.abs( ( a - b ) / ( (a+b)/2 ))).toFixed(2)
} // эта функция называется "pure-function" так как являеться независимой от каких-то конкретных парметров из проекта. То есть она универсальная

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
} // эта функция выбирает первый символ из строчки, приводит его к верхнему регистру. После этого добавляеться оставшаяся строчка, за вычетом первого символа