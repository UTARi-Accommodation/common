import { Month } from './constant';

type Region = 'BTHO' | 'KP' | 'SL';

type Contact = Readonly<{
    email: ReadonlyArray<string> | undefined;
    mobileNumber: ReadonlyArray<string> | undefined;
}>;

type HandlerType = 'Owner' | 'Agent' | 'Tenant';

type Bookmarked = boolean;

type Location = Readonly<{
    address: string;
    coordinate: Readonly<{
        latitude: number;
        longitude: number;
    }>;
}>;

type Remarks = Readonly<{
    remark: string;
    month: Month;
    year: number;
}>;

type RoomProperties = Readonly<{
    rental: number;
    capacities: ReadonlyArray<number>;
}>;

type Room = Readonly<{
    master: RoomProperties | undefined;
    middle: RoomProperties | undefined;
    small: RoomProperties | undefined;
}>;

type Unit = Readonly<{
    bedRooms: number;
    bathRooms: number;
    rental: number;
}>;

type RoomType = 'Room' | 'Roommate';
type UnitType = 'House' | 'Condominium';

type Category = Readonly<
    | {
          type: 'Room';
          roomType: RoomType;
      }
    | {
          type: 'Unit';
          unitType: UnitType;
      }
>;

type Accommodations = ReadonlyArray<
    Readonly<{
        id: number;
        handlerType: HandlerType;
        name: string;
        contact: Contact;
        accommodation: Readonly<
            | {
                  type: 'Room';
                  roomType: RoomType;
                  rooms: Room;
              }
            | {
                  type: 'Unit';
                  unitType: UnitType;
                  unit: Unit;
              }
        >;
        address: string;
        facilities: string;
        remarks: Remarks;
        score: number;
    }>
>;

type QueriedContact = Readonly<{
    mobileNumber: NonNullable<Contact['mobileNumber']>;
    email: NonNullable<Contact['email']>;
}>;

type QueriedAccommodation = Readonly<{
    id: number;
    contact: QueriedContact;
    location: Location;
    facilities: string;
    remarks: Remarks;
    ratings: ReadonlyArray<number>;
    visitCount: number;
    bookmarked: Bookmarked;
}>;

type QueriedUnit = QueriedAccommodation &
    Readonly<{
        properties: Unit;
    }>;

type QueriedDetails = Readonly<{
    location: QueriedUnit['location'];
    handler: Readonly<{
        name: string;
        handlerType: HandlerType;
    }>;
    rating: number | undefined;
}>;

type QueriedUnitDetails = Readonly<
    Omit<QueriedUnit, 'location'> & QueriedDetails
>;

type RoomSize = 'Master' | 'Middle' | 'Small';

type QueriedRoom = QueriedAccommodation &
    Readonly<{
        properties: RoomProperties &
            Readonly<{
                size: RoomSize;
            }>;
    }>;

type QueriedRoomDetails = Readonly<
    Omit<QueriedRoom, 'location'> & QueriedDetails
>;

type AccommodationType = 'Unit' | 'Room';

type SortedUnit = ReadonlyArray<
    Omit<QueriedUnit, 'visitCount' | 'contact' | 'remarks'> & {
        remarks: Readonly<Omit<QueriedUnit['remarks'], 'remark'>>;
    }
>;

type SortedRoom = ReadonlyArray<
    Omit<QueriedRoom, 'visitCount' | 'contact' | 'remarks'> & {
        remarks: Readonly<Omit<QueriedRoom['remarks'], 'remark'>>;
    }
>;

type MultiSelect<T> = ReadonlyArray<T>;

type MultiSelectNumber = MultiSelect<number>;

// refer https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-405931434
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type CommonApi = Readonly<{
    token: string | undefined;
    page: number;
}>;

type QueryRoomsAPI = WithOptional<
    QueryRoomWithCapacities,
    'maxRental' | 'minRental' | 'search'
> &
    CommonApi;
type QueryUnitsAPI = WithOptional<
    QueryUnitWithBathRoomsAndBedRooms,
    'maxRental' | 'minRental' | 'search'
> &
    CommonApi;

type QueryCommonFields = Readonly<{
    region: Region;
    maxRental: number | undefined;
    minRental: number | undefined;
    search: string | undefined;
}>;

type QueryRoomWithoutCapacities = QueryCommonFields &
    Readonly<{
        roomType: RoomType;
    }>;

type Capacities = Readonly<{
    capacities: MultiSelectNumber;
}>;

type QueryRoomWithCapacities = QueryRoomWithoutCapacities & Capacities;

type QueryUnitWithoutBathRoomsAndBedRooms = QueryCommonFields &
    Readonly<{
        unitType: UnitType;
    }>;

type BathRoomsAndBedRooms = Readonly<{
    bathRooms: MultiSelectNumber;
    bedRooms: MultiSelectNumber;
}>;

type QueryUnitWithBathRoomsAndBedRooms = QueryUnitWithoutBathRoomsAndBedRooms &
    BathRoomsAndBedRooms;

type RentalFrequencies = ReadonlyArray<Readonly<[number, number]>>;

type RentalRange = Readonly<{
    min: number;
    max: number;
}>;

// Bookmarked

type QueryBookmarkedRoomAPI = QueryBookmarkedRoom & CommonApi;
type QueryBookmarkedUnitAPI = QueryBookmarkedUnit & CommonApi;

type QueryBookmarkedRoom = Readonly<{
    minRental: number | undefined;
    maxRental: number | undefined;
    search: string | undefined;
    roomTypes: MultiSelect<RoomType>;
    regions: MultiSelect<Region>;
}> &
    Capacities;

type SortedBookmarkedRoomDownload = ReadonlyArray<
    Omit<QueriedRoomDetails, 'bookmarked' | 'visitCount' | 'location'> &
        Readonly<{
            timeCreated: Date;
            address: QueriedRoomDetails['location']['address'];
        }>
>;

type QueryBookmarkedUnit = Readonly<{
    minRental: number | undefined;
    maxRental: number | undefined;
    search: string | undefined;
    unitTypes: MultiSelect<UnitType>;
    regions: MultiSelect<Region>;
}> &
    BathRoomsAndBedRooms;

type SortedBookmarkedUnitDownload = ReadonlyArray<
    Omit<QueriedUnitDetails, 'bookmarked' | 'visitCount' | 'location'> &
        Readonly<{
            timeCreated: Date;
            address: QueriedUnitDetails['location']['address'];
        }>
>;

type Center =
    | Readonly<{
          lat: number;
          lng: number;
      }>
    | undefined;

type QueryDetailedAPI = Readonly<{
    id: number;
    token: CommonApi['token'];
}>;

type RoomsQueried = Readonly<{
    rooms: SortedRoom;
    numberOfResultsQueried: number;
    rentalRangeFrequencies: RentalFrequencies;
    capacities: MultiSelectNumber;
    page: number;
    totalPage: number;
    center: Center;
}>;

type UnitsQueried = Readonly<{
    units: SortedUnit;
    numberOfResultsQueried: number;
    rentalRangeFrequencies: RentalFrequencies;
    bathRooms: MultiSelectNumber;
    bedRooms: MultiSelectNumber;
    page: number;
    totalPage: number;
    center: Center;
}>;

export {
    Region,
    Contact,
    Room,
    RoomProperties,
    RoomType,
    RoomSize,
    Unit,
    Remarks,
    UnitType,
    Category,
    Accommodations,
    QueriedUnit,
    QueriedRoom,
    HandlerType,
    AccommodationType,
    QueriedContact,
    QueriedRoomDetails,
    QueriedUnitDetails,
    SortedRoom,
    SortedUnit,
    RentalFrequencies,
    RentalRange,
    QueryRoomWithCapacities,
    QueryRoomWithoutCapacities,
    QueryUnitWithoutBathRoomsAndBedRooms,
    QueryUnitWithBathRoomsAndBedRooms,
    Location,
    MultiSelectNumber,
    QueryBookmarkedRoom,
    QueryBookmarkedUnit,
    Center,
    SortedBookmarkedUnitDownload,
    SortedBookmarkedRoomDownload,
    QueryBookmarkedUnitAPI,
    QueryBookmarkedRoomAPI,
    QueryRoomsAPI,
    QueryUnitsAPI,
    QueryDetailedAPI,
    RoomsQueried,
    UnitsQueried,
};
