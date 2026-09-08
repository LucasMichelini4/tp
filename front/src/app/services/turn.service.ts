import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnDto } from '../models/turn.model.js';

@Injectable({
  providedIn: 'root'

})
export class TurnService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/api/v1/turn';

  createTurn(turn: TurnDto): Observable<TurnDto> {
    return this.http.post<TurnDto>(this.apiUrl, turn);
  }
}