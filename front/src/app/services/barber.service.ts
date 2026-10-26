import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Barber } from "../models/barber.model.js";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/api/v1/barber';

  createBarber(barber: Barber): Observable<Barber> {
    return this.http.post<Barber>(this.apiUrl, barber);
  }
  getBarber(): Observable<Barber[]> {
    return this.http.get<Barber[]>(this.apiUrl);
  }
  getBarberDeleted(): Observable<Barber[]> {
    return this.http.get<Barber[]>(`${this.apiUrl}/deleted`);
  }
  getBarberByDni(dni: string): Observable<Barber> {
    return this.http.get<Barber>(`${this.apiUrl}/${dni}`);
  }
  updateBarber(barber: Barber): Observable<Barber> {
    return this.http.put<Barber>(`${this.apiUrl}/{dni}`, barber);
  }
  deletedBarber(dni: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${dni}`);
  }
  restoreBarber(dni: string): Observable<Barber> {
    return this.http.patch<Barber>(`${this.apiUrl}/${dni}/restore`, {});
  }
}