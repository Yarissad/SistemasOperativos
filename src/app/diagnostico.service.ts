import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  private apiUrl = 'http://localhost:3000/api/diagnostics';

  constructor(private http: HttpClient) { }

   runDiagnostics(data: {
    diagnostics: string[];
    frequency: number;
    iterations: number;
    email?: string;
  }) {
    return this.http.post(`${this.apiUrl}/run`, data);
  }
}
