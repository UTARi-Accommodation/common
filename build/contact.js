import { GranulaString, isEmpty } from 'granula-string';
const validateEmail = (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
const getName = (value) => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave name section empty*'
        : value.isBlank()
            ? '*Please do not leave name section blank*'
            : '',
});
const getEmail = (value) => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave email section empty*'
        : value.isBlank()
            ? '*Please do not leave email section blank*'
            : validateEmail(value.valueOf())
                ? ''
                : '*Please enter valid email format*',
});
const getMessage = (value) => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave message section empty*'
        : value.isBlank()
            ? '*Please do not leave message section blank*'
            : value.inRangeOf({
                min: 10,
                excludeBlankSpace: true,
            })
                ? ''
                : '*At least 10 words are required*',
});
const allValueValid = (values) => {
    const name = getName(GranulaString.createFromString(values.name));
    const email = getEmail(GranulaString.createFromString(values.email));
    const message = getMessage(GranulaString.createFromString(values.message));
    const noError = isEmpty(name.error) && isEmpty(email.error) && isEmpty(message.error);
    const nameInvalid = name.value.isBlank() || name.value.isEmpty();
    const messageInvalid = message.value.isBlank() ||
        message.value.isEmpty() ||
        !message.value.inRangeOf({
            min: 10,
            excludeBlankSpace: true,
        });
    const inputValid = messageInvalid && validateEmail(email.value.valueOf()) && !nameInvalid;
    return noError && !inputValid;
};
export { allValueValid, getMessage, getEmail, getName };
//# sourceMappingURL=contact.js.map