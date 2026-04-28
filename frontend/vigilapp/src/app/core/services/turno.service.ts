import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private static readonly API_BASE = 'https://vigilapp-backend.onrender.com';
  private apiUrl = TurnoService.API_BASE + '/api/turnos'; 

  constructor(private http: HttpClient) {}

  getTurnos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  tomarTurno(idTurno: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${idTurno}/tomar`, {});
  }

  reasignarTurno(idTurno: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${idTurno}/reasignar`, {});
  }
}