import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tourist } from 'src/app/models/data/tourist';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { ImagePathResponse } from 'src/app/models/shared/image-path-response';
import { TouristInputModel } from 'src/app/models/view-models/input/tourist-input-model';
import { TouristViewModel } from 'src/app/models/view-models/tourist-view-model';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Tourist[]>{
    return this.http.get<Tourist[]>(`${apiUrl}/Tourists`);
  } 
  getVM():Observable<TouristViewModel[]>{
    return this.http.get<TouristViewModel[]>(`${apiUrl}/Tourists/VM`);
  } 
  getById(id:number):Observable<Tourist>{
    return this.http.get<Tourist>(`${apiUrl}/Tourists/${id}`);
  } 
  insert(data:TouristInputModel):Observable<Tourist>{
    return this.http.post<Tourist>(`${apiUrl}/Tourists/VM`, data);
  }
  update(data:TouristInputModel):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Tourists/${data.touristId}/VM`, data);
  }
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('picture', f);
    //console.log(f);
    return this.http.post<ImagePathResponse>(`${apiUrl}/Tourists/Upload/${id}`, formData);
  }
  delete(data:Tourist):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Tourists/${data.touristId}`);
  }
  
}
