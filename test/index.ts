import testArrayParser from './parser/array';
import testCoordinateParser from './parser/coordinate';
import testNullableParser from './parser/nullable';
import testSearchParser from './parser/search';
import testContactValidation from './contact/allValueValid';

const tests: ReadonlyArray<readonly [() => void, 'only'?]> = [
    [testArrayParser],
    [testCoordinateParser],
    [testNullableParser],
    [testSearchParser],
    [testContactValidation],
];

const selectedTests = tests.filter(([_, only]) => only);

if (process.env.IS_CI && selectedTests.length) {
    throw new Error('cannot have "only" in ci cd');
}

(!selectedTests.length ? tests : selectedTests).forEach(([test]) => test());
