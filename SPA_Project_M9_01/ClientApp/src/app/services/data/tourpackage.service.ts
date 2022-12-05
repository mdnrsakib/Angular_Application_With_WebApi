import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { TourPackage } from 'src/app/models/data/tourpackage';
import { TourPackageViewModel } from 'src/app/models/view-models/tourpackage-view-model';

@Injectable({
  providedIn: 'root'
})
export class TourpackageService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<TourPackage[]>{
    return this.http.get<TourPackage[]>(`${apiUrl}/TourPackages`);
  } 
  getVM():Observable<TourPackageViewModel[]>{
    return this.http.get<TourPackageViewModel[]>(`${apiUrl}/TourPackages/VM`);
  } 
  getById(id:number):Observable<TourPackage>{
    return this.http.get<TourPackage>(`${apiUrl}/TourPackages/${id}`);
  } 
  insert(data:TourPackage):Observable<TourPackage>{
    return this.http.post<TourPackage>(`${apiUrl}/TourPackages`, data);
  } 
  update(data:TourPackage):Observable<any>{
    return this.http.put<any>(`${apiUrl}/TourPackages/${data.tourPackageId}`, data);
  } 
  delete(data:TourPackage):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/TourPackages/${data.tourPackageId}`);
  }
}
