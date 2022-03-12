import { isEmpty } from 'granula-string';
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
const allValueValid = ({ value: name, error: nameErr }, { value: email, error: emailErr }, { value: message, error: messageErr }) => {
    const noError = isEmpty(nameErr) && isEmpty(emailErr) && isEmpty(messageErr);
    const nameInvalid = name.isBlank() || name.isEmpty();
    const messageInvalid = message.isBlank() ||
        message.isEmpty() ||
        !message.inRangeOf({
            min: 10,
            excludeBlankSpace: true,
        });
    const inputValid = messageInvalid && validateEmail(email.valueOf()) && !nameInvalid;
    return noError && !inputValid;
};
export { allValueValid, getMessage, getEmail, getName };
//# sourceMappingURL=contact.js.map