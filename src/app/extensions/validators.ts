
export var Validators = {

    minMax(min:number, max:number){

        return function (control):{[key:string]:any} {
            let isNumber = /^\d+$/.test(control.value),
                value = parseInt(control.value);

            return (!isNumber || min > value || value > max)?{minmax:true}:null;
        };
    },

    yearFrom(minYear:number){

        return function (control):{[key:string]:any}{
            let value = control.value,
                isValidFormat = /^\d{4}$/.test(value);

            if(isValidFormat && (+value >= minYear))return null;

            return {yearfrom:true};
        }
    },

    date(minDate:Date){
        return function (control):{[key:string]:any}{
            let value = control.value,
                regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

            if (
                regex.test(value)
                && ((new Date(value)) >= minDate)
            ) { return null;}

            return {date:true};
        };
    },

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
