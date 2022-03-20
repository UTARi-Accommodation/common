import { allValueValid } from '../../src';

export default () =>
    describe('Contact allValueValid', () => {
        const name = 'Wendy';
        const email = 'wendy2000@gmail.com';
        const message = 'Wendy is here to test';
        it('should attest all values are valid', () => {
            expect(
                allValueValid({
                    name,
                    email,
                    message,
                })
            ).toBe(true);
        });
        it('should attest all values are valid except name', () => {
            expect(
                allValueValid({
                    name: '',
                    email,
                    message,
                })
            ).toBe(false);
            expect(
                allValueValid({
                    name: ' ',
                    email,
                    message,
                })
            ).toBe(false);
        });
        it('should attest all values are valid except email', () => {
            expect(
                allValueValid({
                    name,
                    email: '',
                    message,
                })
            ).toBe(false);
            expect(
                allValueValid({
                    name,
                    email: ' ',
                    message,
                })
            ).toBe(false);
            expect(
                allValueValid({
                    name,
                    email: 'wendy@g',
                    message,
                })
            ).toBe(false);
        });
        it('should attest all values are valid except message', () => {
            expect(
                allValueValid({
                    name,
                    email,
                    message: '',
                })
            ).toBe(false);
            expect(
                allValueValid({
                    name,
                    email,
                    message: ' ',
                })
            ).toBe(false);
            expect(
                allValueValid({
                    name,
                    email,
                    message: '123456789',
                })
            ).toBe(false);
        });
    });
