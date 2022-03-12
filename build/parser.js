import { capitalize, isPositiveInt } from 'granula-string';
import { parseAsCustomType, parseAsNumber, parseAsString, } from 'parse-dont-validate';
const parseNullableAsDefaultOrUndefined = (t) => t ?? undefined;
const parseStringAsArrayInt = (value) => !isPositiveInt(value) ? [] : [parseInt(value)];
const parseAsReadonlyIntArray = (values) => parseAsString(values)
    .orElseGetEmptyString()
    .split(',')
    .flatMap((value) => parseStringAsArrayInt(value));
const parseAsRegion = (region) => parseAsCustomType(region, (region) => region === 'SL' || region === 'KP' || region === 'BTHO').orElseGetUndefined();
const parseAsReadonlyRegionArray = (regions) => parseAsString(regions)
    .orElseGetEmptyString()
    .split(',')
    .flatMap((region) => {
    const parsed = parseAsRegion(region.toUpperCase());
    return parsed ? [parsed] : [];
});
const parseAsRoomType = (roomType) => parseAsCustomType(roomType, (roomType) => roomType === 'Room' || roomType === 'Roommate').orElseGetUndefined();
const parseAsReadonlyRoomTypeArray = (roomTypes) => parseAsString(roomTypes)
    .orElseGetEmptyString()
    .split(',')
    .flatMap((roomType) => {
    const parsed = parseAsRoomType(capitalize(roomType.toLowerCase()));
    return parsed ? [parsed] : [];
});
const parseAsUnitType = (unitType) => parseAsCustomType(unitType, (unitType) => unitType === 'House' || unitType === 'Condominium').orElseGetUndefined();
const parseAsReadonlyUnitTypeArray = (unitTypes) => parseAsString(unitTypes)
    .orElseGetEmptyString()
    .split(',')
    .flatMap((unitType) => {
    const parsed = parseAsUnitType(capitalize(unitType.toLowerCase()));
    return parsed ? [parsed] : [];
});
const parseAsLatitude = (latitude) => parseAsNumber(latitude)
    .inRangeOf(-90, 90)
    .orElseThrowCustom(`Expect lat to be in range of -90 to 90, got "${latitude}" instead`);
const parseAsLongitude = (longitude) => parseAsNumber(longitude)
    .inRangeOf(-180, 180)
    .orElseThrowCustom(`Expect long to be in range of -180 to 180, got "${longitude}" instead`);
const parseAsSearch = (search) => parseAsString(search).orElseGetUndefined();
export { parseAsLongitude, parseAsLatitude, parseAsReadonlyIntArray, parseAsReadonlyRegionArray, parseAsRegion, parseAsReadonlyRoomTypeArray, parseAsRoomType, parseAsReadonlyUnitTypeArray, parseAsUnitType, parseAsSearch, parseNullableAsDefaultOrUndefined, };
//# sourceMappingURL=parser.js.map