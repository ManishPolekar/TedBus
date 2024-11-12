export interface Booking{
    id?:string;
    customerId:string;
    passengerDetails: Passenger[];
    email:string;
    phoneNumber:string;
    fare: number;
    status:string;
    bookingDate:string;
    busId:string;
    seats: number[];
    departureDetails: TripDetails;
    arrivalDetails: TripDetails;
    duration: string;
    isBusinessTravel?: boolean;
    businessDetails?: BusinessDetails;
    isInsurance?: boolean;
    isCovidDonated?: boolean;
}

interface Passenger {
    name: string;
    age: number;
    gender: string;
}

interface TripDetails {
    city: string;
    location: string;
    time: number | string;
}

interface BusinessDetails {
    gst?: string;
    name?: string;
    address?: string;
    email?: string;
}

