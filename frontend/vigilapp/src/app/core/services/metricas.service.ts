import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  private static readonly API_BASE = 'https://vigilapp-backend.onrender.com';
  private apiUrl = MetricasService.API_BASE + '/api/metricas';

  constructor(private http: HttpClient) {}

  getMetricasDocente(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}