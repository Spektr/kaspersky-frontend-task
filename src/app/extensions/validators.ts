/**
 * Кастомные валидаторы
 *
 * @module Validators
 * @example
 * new Control('', Validators.minMax(0,10000)) - навешивает на контрол валидатор диапазона значений
 */
export var Validators = {

    /**
     * Валидация диапазона значений
     *
     * @param min {number}          - начинающиеся с (не менее, включая)
     * @param max {number}          - заканчивающиеся до (не более, включая)
     * @returns {function(any): {}} - лямбда для проверки значения контрола
     */
    minMax(min:number, max:number){

        return function (control):{[key:string]:any} {
            let isNumber = /^\d+$/.test(control.value),
                value = parseInt(control.value);

            return (!isNumber || min > value || value > max)?{minmax:true}:null;
        };
    },

    /**
     * Валидация года начавшегося не раньше чем указанный (включая)
     *
     * @param minYear {number}      - минимальный доступный год
     * @returns {function(any): {}} - лямбда для проверки значения контрола
     */
    yearFrom(minYear:number){

        return function (control):{[key:string]:any}{
            let value = control.value,
                isValidFormat = /^\d{4}$/.test(value);

            if(isValidFormat && (+value >= minYear))return null;

            return {yearfrom:true};
        }
    },

    /**
     * Валидация даты начавшейся не раньше чем указанная (включая)
     *
     * @param minDate {Date}        - минимально доступная дата
     * @returns {function(any): {}} - лямбда для проверки значения контрола
     */
    date(minDate:Date){
        return function (control):{[key:string]:any}{
            let value = control.value,
                regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]((?:18|19|20)\d\d)$/,
                match = (value?value.match(regex):null);

            if (
                match
                && ((new Date(+match[3],+match[2]-1,+match[1])) >= minDate)
            ) { return null;}

            return {date:true};
        };
    },

    /**
     * Валидация международного идентификатора книги
     * чесно позаимоствованная регулярка
     *
     * @see {@link https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s13.html}
     * @returns {function(any): {}} - лямбда для проверки значения контрола
     */
    isbn(){
        return function (control):{[key:string]:any}{
            let subject = control.value,
                regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
                result = {isbn:true};

            if (regex.test(subject)) {
                // Remove non ISBN digits, then split into an array
                var chars = subject.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
                // Remove the final ISBN digit from `chars`, and assign it to `last`
                var last = chars.pop();
                var sum = 0;
                var check, i;

                if (chars.length == 9) {
                    // Compute the ISBN-10 check digit
                    chars.reverse();
                    for (i = 0; i < chars.length; i++) {
                        sum += (i + 2) * parseInt(chars[i], 10);
                    }
                    check = 11 - (sum % 11);
                    if (check == 10) {
                        check = "X";
                    } else if (check == 11) {
                        check = "0";
                    }
                } else {
                    // Compute the ISBN-13 check digit
                    for (i = 0; i < chars.length; i++) {
                        sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
                    }
                    check = 10 - (sum % 10);
                    if (check == 10) {
                        check = "0";
                    }
                }

                if (check == last) {
                    return null;
                } else {
                    return result;
                }
            } else {
                return result;
            }

        };
    }

};
