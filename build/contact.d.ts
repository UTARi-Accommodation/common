import { GranulaString } from 'granula-string';
declare type EmptyString = '';
declare type Name = Readonly<{
    value: GranulaString;
    error: `*Please do not leave name section ${'empty' | 'blank'}*` | EmptyString;
}>;
declare type Email = Readonly<{
    value: GranulaString;
    error: `*Please do not leave email section ${'empty' | 'blank'}*` | '*Please enter valid email format*' | EmptyString;
}>;
declare type Message = Readonly<{
    value: GranulaString;
    error: `*Please do not leave message section ${'empty' | 'blank'}*` | '*At least 10 words are required*' | EmptyString;
}>;
declare type Data = Readonly<{
    type: 'succeed' | 'input';
    message: Message;
    name: Name;
    email: Email;
} | {
    type: 'failed';
    error: string;
}>;
declare const getName: (value: GranulaString) => Name;
declare const getEmail: (value: GranulaString) => Email;
declare const getMessage: (value: GranulaString) => Message;
declare const allValueValid: ({ value: name, error: nameErr }: Name, { value: email, error: emailErr }: Email, { value: message, error: messageErr }: Message) => boolean;
export { allValueValid, getMessage, getEmail, getName };
export type { Name, Email, Message, Data };
//# sourceMappingURL=contact.d.ts.map