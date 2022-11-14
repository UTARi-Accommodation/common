import { capitalize, isPositiveInt } from 'granula-string';
import {
    parseAsCustom,
    parseAsNumber,
    parseAsString,
} from 'parse-dont-validate';
import { Region, RoomType, UnitType } from './accommodation';

const parseNullableAsDefaultOrUndefined = <T>(t: T | null | undefined) =>
    t ?? undefined;

const parseAsReadonlyIntArray = (values: any): ReadonlyArray<number> =>
    parseAsString({
        string: values,
        ifParsingFailThen: 'get',
        alternativeValue: '',
    })
        .split(',')
        .flatMap((value) =>
            !isPositiveInt(value.trim()) ? [] : [parseInt(value.trim())]
        );

const parseAsRegion = (region: any) =>
    parseAsCustom<Region, undefined>({
        value: region,
        ifParsingFailThen: 'get',
        alternativeValue: undefined,
        predicate: (region) =>
            region === 'SL' || region === 'KP' || region === 'BTHO',
    });

const parseAsReadonlyRegionArray = (regions: any): ReadonlyArray<Region> =>
    parseAsString({
        string: regions,
        ifParsingFailThen: 'get',
        alternativeValue: '',
    })
        .split(',')
        .flatMap((region) => {
            const parsed = parseAsRegion(region.trim().toUpperCase());
            return !parsed ? [] : [parsed];
        });

const parseAsRoomType = (roomType: any) =>
    parseAsCustom<RoomType, undefined>({
        value: roomType,
        predicate: (roomType) => roomType === 'Room' || roomType === 'Roommate',
        ifParsingFailThen: 'get',
        alternativeValue: undefined,
    });

const parseAsReadonlyRoomTypeArray = (
    roomTypes: any
): ReadonlyArray<RoomType> =>
    parseAsString({
        string: roomTypes,
        ifParsingFailThen: 'get',
        alternativeValue: '',
    })
        .split(',')
        .flatMap((roomType) => {
            const parsed = parseAsRoomType(
                capitalize(roomType.trim().toLowerCase())
            );
            return !parsed ? [] : [parsed];
        });

const parseAsUnitType = (unitType: any) =>
    parseAsCustom<UnitType, undefined>({
        value: unitType,
        ifParsingFailThen: 'get',
        alternativeValue: undefined,
        predicate: (unitType) =>
            unitType === 'House' || unitType === 'Condominium',
    });

const parseAsReadonlyUnitTypeArray = (
    unitTypes: any
): ReadonlyArray<UnitType> =>
    parseAsString({
        string: unitTypes,
        ifParsingFailThen: 'get',
        alternativeValue: '',
    })
        .split(',')
        .flatMap((unitType) => {
            const parsed = parseAsUnitType(
                capitalize(unitType.trim().toLowerCase())
            );
            return !parsed ? [] : [parsed];
        });

const parseAsLatitude = (latitude: unknown) =>
    parseAsNumber({
        number: latitude,
        ifParsingFailThen: 'throw',
        message: `Expect lat to be in range of -90 to 90, got "${latitude}" instead`,
        inRangeOf: {
            min: -90,
            max: 90,
        },
    });

const parseAsLongitude = (longitude: unknown) =>
    parseAsNumber({
        number: longitude,
        ifParsingFailThen: 'throw',
        message: `Expect long to be in range of -180 to 180, got "${longitude}" instead`,
        inRangeOf: {
            min: -180,
            max: 180,
        },
    });

const parseAsSearch = (search: unknown) =>
    parseAsString({
        string: search,
        ifParsingFailThen: 'get',
        alternativeValue: undefined,
    })?.trim();

export {
    parseAsLongitude,
    parseAsLatitude,
    parseAsReadonlyIntArray,
    parseAsReadonlyRegionArray,
    parseAsRegion,
    parseAsReadonlyRoomTypeArray,
    parseAsRoomType,
    parseAsReadonlyUnitTypeArray,
    parseAsUnitType,
    parseAsSearch,
    parseNullableAsDefaultOrUndefined,
};
