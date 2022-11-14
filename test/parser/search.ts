import { parseAsSearch } from '../../src';
import { describe, it, expect } from 'vitest';

const testSearchParser = () =>
    describe('Search parser', () => {
        it('should parse string as search text', () => {
            const text = '  Testing purpose  ';
            expect(parseAsSearch(text)).toBe(text.trim());
        });
        it('should parse undefined as undefined as parameter is not string', () => {
            expect(parseAsSearch(undefined)).toBe(undefined);
        });
    });

export default testSearchParser;
