import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  private apiUrl = 'http://localhost:8080/api/metricas';

  constructor(private http: HttpClient) {}

  getMetricasDocente(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}