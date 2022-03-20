import { Region, RoomType, UnitType } from "./type";
declare const parseNullableAsDefaultOrUndefined: <T>(t: T | null | undefined) => NonNullable<T> | undefined;
declare const parseAsReadonlyIntArray: (values: any) => ReadonlyArray<number>;
declare const parseAsRegion: (region: any) => Region | undefined;
declare const parseAsReadonlyRegionArray: (regions: any) => ReadonlyArray<Region>;
declare const parseAsRoomType: (roomType: any) => RoomType | undefined;
declare const parseAsReadonlyRoomTypeArray: (roomTypes: any) => ReadonlyArray<RoomType>;
declare const parseAsUnitType: (unitType: any) => UnitType | undefined;
declare const parseAsReadonlyUnitTypeArray: (unitTypes: any) => ReadonlyArray<UnitType>;
declare const parseAsLatitude: (latitude: unknown) => number;
declare const parseAsLongitude: (longitude: unknown) => number;
declare const parseAsSearch: (search: unknown) => string | undefined;
export { parseAsLongitude, parseAsLatitude, parseAsReadonlyIntArray, parseAsReadonlyRegionArray, parseAsRegion, parseAsReadonlyRoomTypeArray, parseAsRoomType, parseAsReadonlyUnitTypeArray, parseAsUnitType, parseAsSearch, parseNullableAsDefaultOrUndefined, };
//# sourceMappingURL=parser.d.ts.map