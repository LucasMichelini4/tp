import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../models/client.model";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:3000/api/v1/client';

    createClient(client: Client): Observable<Client>{
        return this.http.post<Client>(this.apiUrl, client);
    }
    getClient(): Observable<Client[]> {
        return this.http.get<Client[]>(this.apiUrl)
    }
    getClientDeleted(): Observable<Client[]>{
        return this.http.get<Client[]>(`${this.apiUrl}/deleted`);
    }
    getClientByDni(dni: string): Observable<Client> {
        return this.http.get<Client>(`${this.apiUrl}/{dni}`);
    }
    updateClient(client: Client): Observable<Client>{
        return this.http.put<Client>(`${this.apiUrl}/{dni}`, client);
    }
    deletedClient(dni: string): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/{dni}`);
    }
    restoreClient(dni: string): Observable<Client>{
        return this.http.patch<Client>(`${this.apiUrl}/{dni}/restore`, {});
    }
}