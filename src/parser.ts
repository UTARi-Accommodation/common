import { capitalize, isPositiveInt } from 'granula-string';
import {
    parseAsCustomType,
    parseAsNumber,
    parseAsString,
} from 'parse-dont-validate';
import { Region, RoomType, UnitType } from './accommodation';

const parseNullableAsDefaultOrUndefined = <T>(t: T | null | undefined) =>
    t ?? undefined;

const parseAsReadonlyIntArray = (values: any): ReadonlyArray<number> =>
    parseAsString(values)
        .elseGet('')
        .split(',')
        .flatMap((value) =>
            !isPositiveInt(value.trim()) ? [] : [parseInt(value.trim())]
        );

const parseAsRegion = (region: any) =>
    parseAsCustomType<Region>(
        region,
        (region) => region === 'SL' || region === 'KP' || region === 'BTHO'
    ).elseGet(undefined);

const parseAsReadonlyRegionArray = (regions: any): ReadonlyArray<Region> =>
    parseAsString(regions)
        .elseGet('')
        .split(',')
        .flatMap((region) => {
            const parsed = parseAsRegion(region.trim().toUpperCase());
            return !parsed ? [] : [parsed];
        });

const parseAsRoomType = (roomType: any) =>
    parseAsCustomType<RoomType>(
        roomType,
        (roomType) => roomType === 'Room' || roomType === 'Roommate'
    ).elseGet(undefined);

const parseAsReadonlyRoomTypeArray = (
    roomTypes: any
): ReadonlyArray<RoomType> =>
    parseAsString(roomTypes)
        .elseGet('')
        .split(',')
        .flatMap((roomType) => {
            const parsed = parseAsRoomType(
                capitalize(roomType.trim().toLowerCase())
            );
            return !parsed ? [] : [parsed];
        });

const parseAsUnitType = (unitType: any) =>
    parseAsCustomType<UnitType>(
        unitType,
        (unitType) => unitType === 'House' || unitType === 'Condominium'
    ).elseGet(undefined);

const parseAsReadonlyUnitTypeArray = (
    unitTypes: any
): ReadonlyArray<UnitType> =>
    parseAsString(unitTypes)
        .elseGet('')
        .split(',')
        .flatMap((unitType) => {
            const parsed = parseAsUnitType(
                capitalize(unitType.trim().toLowerCase())
            );
            return !parsed ? [] : [parsed];
        });

const parseAsLatitude = (latitude: unknown) =>
    parseAsNumber(latitude)
        .inRangeOf(-90, 90)
        .elseThrow(
            `Expect lat to be in range of -90 to 90, got "${latitude}" instead`
        );

const parseAsLongitude = (longitude: unknown) =>
    parseAsNumber(longitude)
        .inRangeOf(-180, 180)
        .elseThrow(
            `Expect long to be in range of -180 to 180, got "${longitude}" instead`
        );

const parseAsSearch = (search: unknown) =>
    parseAsString(search).elseGet(undefined)?.trim();

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
