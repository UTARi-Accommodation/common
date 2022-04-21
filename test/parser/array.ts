import {
    parseAsReadonlyIntArray,
    parseAsReadonlyRegionArray,
    parseAsReadonlyRoomTypeArray,
    parseAsReadonlyUnitTypeArray,
} from '../../src';

const testArrayParser = () =>
    describe('String to Array parser', () => {
        it('should parse a string number with delimiter of "," as number array', () => {
            expect(parseAsReadonlyIntArray('1, 2, 3,4')).toStrictEqual([
                1, 2, 3, 4,
            ]);
            expect(parseAsReadonlyIntArray('1')).toStrictEqual([1]);
        });
        it('should fail to parse as number array due to mismatching value', () => {
            expect(parseAsReadonlyIntArray('a')).toStrictEqual([]);
        });

        it('should parse a string of region with delimiter of "," as region array', () => {
            expect(parseAsReadonlyRegionArray('SL, KP,BTHO ')).toStrictEqual([
                'SL',
                'KP',
                'BTHO',
            ]);
        });
        it('should fail to parse as region array due to mismatching value', () => {
            expect(parseAsReadonlyRegionArray('Sungai Long')).toStrictEqual([]);
        });

        it('should parse "Room, Roommate" as room type array', () => {
            expect(
                parseAsReadonlyRoomTypeArray(' Room, Roommate')
            ).toStrictEqual(['Room', 'Roommate']);
            expect(parseAsReadonlyRoomTypeArray('Room')).toStrictEqual([
                'Room',
            ]);
        });
        it('should parse as empty array due to mismatch type', () => {
            expect(parseAsReadonlyRoomTypeArray('Roo')).toStrictEqual([]);
        });

        it('should parse "House , Condominium" as unit type array', () => {
            expect(
                parseAsReadonlyUnitTypeArray('House , Condominium')
            ).toStrictEqual(['House', 'Condominium']);
            expect(parseAsReadonlyUnitTypeArray('House')).toStrictEqual([
                'House',
            ]);
        });
        it('should fail to parse as unit type array due to mismatching value', () => {
            expect(parseAsReadonlyUnitTypeArray('Hous')).toStrictEqual([]);
        });
    });

export default testArrayParser;
