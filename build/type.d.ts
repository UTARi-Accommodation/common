import { Month } from './constant';
declare type Region = 'BTHO' | 'KP' | 'SL';
declare type Contact = Readonly<{
    email: ReadonlyArray<string> | undefined;
    mobileNumber: ReadonlyArray<string> | undefined;
}>;
declare type HandlerType = 'Owner' | 'Agent' | 'Tenant';
declare type Bookmarked = boolean;
declare type Location = Readonly<{
    address: string;
    coordinate: Readonly<{
        latitude: number;
        longitude: number;
    }>;
}>;
declare type Remarks = Readonly<{
    remark: string;
    month: Month;
    year: number;
}>;
declare type RoomProperties = Readonly<{
    rental: number;
    capacities: ReadonlyArray<number>;
}>;
declare type Room = Readonly<{
    master: RoomProperties | undefined;
    middle: RoomProperties | undefined;
    small: RoomProperties | undefined;
}>;
declare type Unit = Readonly<{
    bedRooms: number;
    bathRooms: number;
    rental: number;
}>;
declare type RoomType = 'Room' | 'Roommate';
declare type UnitType = 'House' | 'Condominium';
declare type Category = Readonly<{
    type: 'Room';
    roomType: RoomType;
} | {
    type: 'Unit';
    unitType: UnitType;
}>;
declare type Accommodations = ReadonlyArray<Readonly<{
    id: number;
    handlerType: HandlerType;
    name: string;
    contact: Contact;
    accommodation: Readonly<{
        type: 'Room';
        roomType: RoomType;
        rooms: Room;
    } | {
        type: 'Unit';
        unitType: UnitType;
        unit: Unit;
    }>;
    address: string;
    facilities: string;
    remarks: Remarks;
}>>;
declare type QueriedContact = Readonly<{
    mobileNumber: NonNullable<Contact['mobileNumber']>;
    email: NonNullable<Contact['email']>;
}>;
declare type QueriedAccommodation = Readonly<{
    id: number;
    contact: QueriedContact;
    location: Location;
    facilities: string;
    remarks: Remarks;
    ratings: ReadonlyArray<number>;
    visitCount: number;
    bookmarked: Bookmarked;
}>;
declare type QueriedUnit = QueriedAccommodation & Readonly<{
    properties: Unit;
}>;
declare type QueriedDetails = Readonly<{
    location: QueriedUnit['location'];
    handler: Readonly<{
        name: string;
        handlerType: HandlerType;
    }>;
    rating: number | undefined;
}>;
declare type QueriedUnitDetails = Readonly<Omit<QueriedUnit, 'location'> & QueriedDetails>;
declare type RoomSize = 'Master' | 'Middle' | 'Small';
declare type QueriedRoom = QueriedAccommodation & Readonly<{
    properties: RoomProperties & Readonly<{
        size: RoomSize;
    }>;
}>;
declare type QueriedRoomDetails = Readonly<Omit<QueriedRoom, 'location'> & QueriedDetails>;
declare type AccommodationType = 'Unit' | 'Room';
declare type SortedUnit = ReadonlyArray<Omit<QueriedUnit, 'visitCount' | 'contact' | 'remarks'> & {
    remarks: Readonly<Omit<QueriedUnit['remarks'], 'remark'>>;
}>;
declare type SortedRoom = ReadonlyArray<Omit<QueriedRoom, 'visitCount' | 'contact' | 'remarks'> & {
    remarks: Readonly<Omit<QueriedRoom['remarks'], 'remark'>>;
}>;
declare type MultiSelect<T> = ReadonlyArray<T>;
declare type MultiSelectNumber = MultiSelect<number>;
declare type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
declare type CommonApi = Readonly<{
    token: string | undefined;
    page: number;
}>;
declare type QueryRoomsAPI = WithOptional<QueryRoomWithCapacities, 'maxRental' | 'minRental' | 'search'> & CommonApi;
declare type QueryUnitsAPI = WithOptional<QueryUnitWithBathRoomsAndBedRooms, 'maxRental' | 'minRental' | 'search'> & CommonApi;
declare type QueryCommonFields = Readonly<{
    region: Region;
    maxRental: number | undefined;
    minRental: number | undefined;
    search: string | undefined;
}>;
declare type QueryRoomWithoutCapacities = QueryCommonFields & Readonly<{
    roomType: RoomType;
}>;
declare type Capacities = Readonly<{
    capacities: MultiSelectNumber;
}>;
declare type QueryRoomWithCapacities = QueryRoomWithoutCapacities & Capacities;
declare type QueryUnitWithoutBathRoomsAndBedRooms = QueryCommonFields & Readonly<{
    unitType: UnitType;
}>;
declare type BathRoomsAndBedRooms = Readonly<{
    bathRooms: MultiSelectNumber;
    bedRooms: MultiSelectNumber;
}>;
declare type QueryUnitWithBathRoomsAndBedRooms = QueryUnitWithoutBathRoomsAndBedRooms & BathRoomsAndBedRooms;
declare type RentalFrequencies = ReadonlyArray<Readonly<[number, number]>>;
declare type RentalRange = Readonly<{
    min: number;
    max: number;
}>;
declare type QueryBookmarkedRoomAPI = QueryBookmarkedRoom & CommonApi;
declare type QueryBookmarkedUnitAPI = QueryBookmarkedUnit & CommonApi;
declare type QueryBookmarkedRoom = Readonly<{
    minRental: number | undefined;
    maxRental: number | undefined;
    search: string | undefined;
    roomTypes: MultiSelect<RoomType>;
    regions: MultiSelect<Region>;
}> & Capacities;
declare type SortedBookmarkedRoomDownload = ReadonlyArray<Omit<QueriedRoomDetails, 'bookmarked' | 'visitCount' | 'location'> & Readonly<{
    timeCreated: Date;
    address: QueriedRoomDetails['location']['address'];
}>>;
declare type QueryBookmarkedUnit = Readonly<{
    minRental: number | undefined;
    maxRental: number | undefined;
    search: string | undefined;
    unitTypes: MultiSelect<UnitType>;
    regions: MultiSelect<Region>;
}> & BathRoomsAndBedRooms;
declare type SortedBookmarkedUnitDownload = ReadonlyArray<Omit<QueriedUnitDetails, 'bookmarked' | 'visitCount' | 'location'> & Readonly<{
    timeCreated: Date;
    address: QueriedUnitDetails['location']['address'];
}>>;
declare type Center = Readonly<{
    lat: number;
    lng: number;
}>;
declare type QueryDetailedAPI = Readonly<{
    id: number;
    token: CommonApi['token'];
}>;
declare type RoomsQueried = Readonly<{
    rooms: SortedRoom;
    numberOfResultsQueried: number;
    rentalRangeFrequencies: RentalFrequencies;
    capacities: MultiSelectNumber;
    page: number;
    totalPage: number;
    center: Center;
}>;
declare type UnitsQueried = Readonly<{
    units: SortedUnit;
    numberOfResultsQueried: number;
    rentalRangeFrequencies: RentalFrequencies;
    bathRooms: MultiSelectNumber;
    bedRooms: MultiSelectNumber;
    page: number;
    totalPage: number;
    center: Center;
}>;
export { Region, Contact, Room, RoomProperties, RoomType, RoomSize, Unit, Remarks, UnitType, Category, Accommodations, QueriedUnit, QueriedRoom, HandlerType, AccommodationType, QueriedContact, QueriedRoomDetails, QueriedUnitDetails, SortedRoom, SortedUnit, RentalFrequencies, RentalRange, QueryRoomWithCapacities, QueryRoomWithoutCapacities, QueryUnitWithoutBathRoomsAndBedRooms, QueryUnitWithBathRoomsAndBedRooms, Location, MultiSelectNumber, QueryBookmarkedRoom, QueryBookmarkedUnit, Center, SortedBookmarkedUnitDownload, SortedBookmarkedRoomDownload, QueryBookmarkedUnitAPI, QueryBookmarkedRoomAPI, QueryRoomsAPI, QueryUnitsAPI, QueryDetailedAPI, RoomsQueried, UnitsQueried, };
//# sourceMappingURL=type.d.ts.map