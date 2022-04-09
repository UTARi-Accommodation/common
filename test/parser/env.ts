import { parseAsEnv } from '../../src';

const testEnvParser = () =>
    describe('Environment variable parser', () => {
        it('should parse successfully', () => {
            const env = 'development';
            expect(parseAsEnv({ env, name: 'NODE_ENV' })).toBe(env);
        });
        it('should throw error', () => {
            const env = undefined;
            expect(() => parseAsEnv({ env, name: 'NODE_ENV' })).toThrowError();
        });
    });

export default testEnvParser;
