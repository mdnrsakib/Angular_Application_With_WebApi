import { TransPortMode } from "../shared/app-constants";

export interface PackagefeatureViewModel {
    packageFeatureId?:number;
    transportMode?:TransPortMode;
    hotelBooking?:string;
    status?:boolean;
    tourPackageId?:number;
    canDelete?:boolean
}
