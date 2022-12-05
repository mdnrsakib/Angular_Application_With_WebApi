import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Packagefeature } from 'src/app/models/data/packagefeature';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { PackagefeatureViewModel } from 'src/app/models/view-models/packagefeature-view-model';

@Injectable({
  providedIn: 'root'
})
export class PackagefeatureService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Packagefeature[]>{
    return this.http.get<Packagefeature[]>(`${apiUrl}/PackageFeatures`);
  } 
  getVM():Observable<PackagefeatureViewModel[]>{
    return this.http.get<PackagefeatureViewModel[]>(`${apiUrl}/PackageFeatures/VM`);
  } 
  getById(id:number):Observable<Packagefeature>{
    return this.http.get<Packagefeature>(`${apiUrl}/PackageFeatures/${id}`);
  } 
  insert(data:Packagefeature):Observable<Packagefeature>{
    return this.http.post<Packagefeature>(`${apiUrl}/PackageFeatures`, data);
  } 
  update(data:Packagefeature):Observable<any>{
    return this.http.put<any>(`${apiUrl}/PackageFeatures/${data.packageFeatureId}`, data);
  } 
  delete(data:Packagefeature):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/PackageFeatures/${data.packageFeatureId}`);
  }
}
