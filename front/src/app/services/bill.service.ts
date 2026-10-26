import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bill } from "../models/bill.model.js";

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/api/v1/bill';

  createBarber(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill);
  }

  getBill(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }

  getBillDeleted(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/deleted`);
  }

  getBillByDni(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.apiUrl}/{id}`, bill)
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  restoreBill(id: number): Observable<Bill> {
    return this.http.patch<Bill>(`${this.apiUrl}/${id}/restore`, {})
  }
}