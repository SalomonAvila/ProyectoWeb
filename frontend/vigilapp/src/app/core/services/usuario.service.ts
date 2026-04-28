import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private static readonly API_BASE = 'https://vigilapp-backend.onrender.com';
  private apiUrl = UsuarioService.API_BASE + '/api/usuario';

  constructor(private http: HttpClient) {}

  getUsuarioActual(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/actual`);
  }

  logout() {
    localStorage.clear();
  }
}