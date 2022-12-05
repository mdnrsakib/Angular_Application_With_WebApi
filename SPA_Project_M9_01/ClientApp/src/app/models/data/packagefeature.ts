import { TransPortMode } from "../shared/app-constants";

export interface Packagefeature {
    packageFeatureId?:number;
    transportMode?:TransPortMode;
    hotelBooking?:string;
    status?:boolean;
    tourPackageId?:number;
}
