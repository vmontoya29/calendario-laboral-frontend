import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pais } from '../models/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private baseUrl = `${environment.apiUrl}/paises`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.baseUrl);
  }

  getById(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.baseUrl}/${id}`);
  }

  create(pais: Omit<Pais, 'id'>): Observable<Pais> {
    return this.http.post<Pais>(this.baseUrl, pais);
  }

  update(pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.baseUrl}/${pais.id}`, pais);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
