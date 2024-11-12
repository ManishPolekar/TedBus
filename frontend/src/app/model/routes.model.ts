export interface Route {
    _id: string,
    departureLocation: {
        name: string;
        subLocation: string[];
    };
    arrivalLocation: {
        name: string;
        subLocation: string[];
    };
    duration: number;
}