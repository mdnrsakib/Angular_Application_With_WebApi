import { PakageCategory } from "../shared/app-constants";

export interface TourPackage {
    tourPackageId?:string;
    packageCategory?:PakageCategory;
    packageName?:string;
    costPerPerson?:number;
    tourTime?:number;
}
