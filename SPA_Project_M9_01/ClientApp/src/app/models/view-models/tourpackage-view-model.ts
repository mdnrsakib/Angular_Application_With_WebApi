import { PakageCategory } from "../shared/app-constants";

export interface TourPackageViewModel {
    tourPackageId?:string;
    packageCategory?:PakageCategory;
    packageName?:string;
    costPerPerson?:number;
    tourTime?:number;
    canDelete?:boolean
}