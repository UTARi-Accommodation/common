import { capitalize, isPositiveInt } from 'granula-string';
import {
    parseAsCustomType,
    parseAsNumber,
    parseAsString,
} from 'parse-dont-validate';
import { Region, RoomType, UnitType } from './type';

const parseNullableAsDefaultOrUndefined = <T>(t: T | null | undefined) =>
    t ?? undefined;

const parseAsReadonlyIntArray = (values: any): ReadonlyArray<number> =>
    parseAsString(values)
        .orElseGetEmptyString()
        .split(',')
        .flatMap((value) =>
            !isPositiveInt(value.trim()) ? [] : [parseInt(value.trim())]
        );

const parseAsRegion = (region: any) =>
    parseAsCustomType<Region>(
        region,
        (region) => region === 'SL' || region === 'KP' || region === 'BTHO'
    ).orElseGetUndefined();

const parseAsReadonlyRegionArray = (regions: any): ReadonlyArray<Region> =>
    parseAsString(regions)
        .orElseGetEmptyString()
        .split(',')
        .flatMap((region) => {
            const parsed = parseAsRegion(region.trim().toUpperCase());
            return parsed ? [parsed] : [];
        });

const parseAsRoomType = (roomType: any) =>
    parseAsCustomType<RoomType>(
        roomType,
        (roomType) => roomType === 'Room' || roomType === 'Roommate'
    ).orElseGetUndefined();

const parseAsReadonlyRoomTypeArray = (
    roomTypes: any
): ReadonlyArray<RoomType> =>
    parseAsString(roomTypes)
        .orElseGetEmptyString()
        .split(',')
        .flatMap((roomType) => {
            const parsed = parseAsRoomType(
                capitalize(roomType.trim().toLowerCase())
            );
            return parsed ? [parsed] : [];
        });

const parseAsUnitType = (unitType: any) =>
    parseAsCustomType<UnitType>(
        unitType,
        (unitType) => unitType === 'House' || unitType === 'Condominium'
    ).orElseGetUndefined();

const parseAsReadonlyUnitTypeArray = (
    unitTypes: any
): ReadonlyArray<UnitType> =>
    parseAsString(unitTypes)
        .orElseGetEmptyString()
        .split(',')
        .flatMap((unitType) => {
            const parsed = parseAsUnitType(
                capitalize(unitType.trim().toLowerCase())
            );
            return parsed ? [parsed] : [];
        });

const parseAsLatitude = (latitude: unknown) =>
    parseAsNumber(latitude)
        .inRangeOf(-90, 90)
        .orElseThrowCustom(
            `Expect lat to be in range of -90 to 90, got "${latitude}" instead`
        );

const parseAsLongitude = (longitude: unknown) =>
    parseAsNumber(longitude)
        .inRangeOf(-180, 180)
        .orElseThrowCustom(
            `Expect long to be in range of -180 to 180, got "${longitude}" instead`
        );

const parseAsSearch = (search: unknown) =>
    parseAsString(search).orElseGetUndefined()?.trim();

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
