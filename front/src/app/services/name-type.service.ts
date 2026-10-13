import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { NameType } from "../models/name-type.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NameTypeService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:3000/api/v1/name-type';

    createNameType(nameType: NameType): Observable<NameType> {
        return this.http.post<NameType>(this.apiUrl, nameType);
    }
    getNameTypes(): Observable<NameType[]>{
        return this.http.get<NameType[]>(this.apiUrl)
    }  
    getNameTypeDeleted(): Observable<NameType[]> {
        return this.http.get<NameType[]>(`${this.apiUrl}/deleted`);
    }
    getNameTypeById(id: number): Observable<NameType> {
        return this.http.get<NameType>(`${this.apiUrl}/${id}`);
    }
    updateNameType(nameType: NameType): Observable<NameType> {
        return this.http.put<NameType>(`${this.apiUrl}/{id}`, nameType);
    }
    deleteNameType(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    restoreNameType(id: number): Observable<NameType> {
        return this.http.patch<NameType>(`${this.apiUrl}/${id}/restore`, {});
    }
}
