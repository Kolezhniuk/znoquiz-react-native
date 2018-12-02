const validation = (value, rules, form) => {
    let valid = true;


    for (let rule in rules) {
        switch (rule) {
            case "isRequired":
                valid = valid && validateRequired(value);
                break;
            case "isEmail":
                valid = valid && validateEmail(value);
                break;
            case "minLength":
                valid = valid && validateMinLength(value, rules[rule]);
                break;
            case "confirmPass":
                valid = valid && validateConfirmPass(value, form[rules.confirmPass].value);
                break;
            default:
                valid = true;
                break;

        }
    }
    return valid;
};

const validateRequired = value => value !== '';

const validateEmail = (email) => {
    const temp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return temp.test(String(email).toLowerCase());
};

const validateMinLength = (value, ruleVal) => {
    return value.length <= ruleVal;
};

const validateConfirmPass = (value, compareVal) => value === compareVal;

export default validation;