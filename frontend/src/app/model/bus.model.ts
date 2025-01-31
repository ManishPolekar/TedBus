export interface Bus {
    _id: string;
    operatorName: string;
    busType: string;
    departureTime: string;
    rating: number[];
    totalSeat?: number;
    routes: string;
    images: string;
    liveTracking: number;
    reschedulable: number;
}