import { HttpClient} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Salon } from "../components/create-salon/create-salon.components";

@Injectable({
    providedIn: 'root'
})
export class SalonService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:3000/api/v1/salon';

    createSalon(salon: Salon): Observable<Salon> {
        return this.http.post<Salon>(this.apiUrl, salon);
    }
    
    getSalon(): Observable<Salon[]> {
        return this.http.get<Salon[]>(this.apiUrl)
    }

    getSalonByCuit(cuit: string): Observable<Salon> {
        return this.http.get<Salon>(`${this.apiUrl}/${cuit}`);
    }

    getSalonDeleted(): Observable<Salon[]> {
        return this.http.get<Salon[]>(`${this.apiUrl}/deleted`);
    }

    updateSalon(salon: Salon): Observable<Salon> {
        return this.http.put<Salon>(`${this.apiUrl}/{cuit}`, salon);
    }

    deleteSalon(cuit: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${cuit}`);
    }

    restoreSalon(cuit: string): Observable<Salon> {
        return this.http.patch<Salon>(`${this.apiUrl}/${cuit}/restore`, {});
    }
}