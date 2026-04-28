import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private static readonly API_BASE = 'https://vigilapp-backend.onrender.com';
  private apiUrl = NotificacionService.API_BASE + '/api/notificaciones';

  constructor(private http: HttpClient) {}

  getNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}