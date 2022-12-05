import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelAgent } from 'src/app/models/data/travelagent';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { AgenttourpackageViewModel } from 'src/app/models/view-models/agenttourpackage-view-model';
import { TravelAgentViewModel } from 'src/app/models/view-models/travelagent-view-model';

@Injectable({
  providedIn: 'root'
})
export class TravelagentService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<TravelAgent[]>{
    return this.http.get<TravelAgent[]>(`${apiUrl}/TravelAgents`);
  } 
  getVM():Observable<TravelAgentViewModel[]>{
    return this.http.get<TravelAgentViewModel[]>(`${apiUrl}/TravelAgents/VM`);
  } 
  getById(id:number):Observable<TravelAgent>{
    return this.http.get<TravelAgent>(`${apiUrl}/TravelAgents/${id}`);
  } 
  insert(data:TravelAgent):Observable<TravelAgent>{
    return this.http.post<TravelAgent>(`${apiUrl}/TravelAgents`, data);
  } 
  getWithItems(id:number):Observable<AgenttourpackageViewModel>{
    return this.http.get<AgenttourpackageViewModel>(`${apiUrl}/TravelAgents/${id}/OI`)
  }
  update(data:TravelAgent):Observable<any>{
    return this.http.put<any>(`${apiUrl}/TravelAgentsContext/VM/${data.travelAgentId}`, data)
  }
  delete(data:TravelAgent):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/TravelAgents/${data.travelAgentId}`);
  }
}
