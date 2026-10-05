import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Service } from '../models/service.model';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:300/api/v1/service'

  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service);
  }

  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  getServiceDeleted(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/deleted`);
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/{id}`);
  }

  updateService(service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/{id}`, service);
  }

  deletedService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/{dni}`);
  }

  restoreService(id: number): Observable<Service> {
    return this.http.patch<Service>(`${this.apiUrl}/{id}/restore`, {})
  }

} 