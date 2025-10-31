import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoFestivo } from '../models/tipo-festivo.model';

@Injectable({
  providedIn: 'root'
})
export class TipoFestivoService {
  private baseUrl = `${environment.apiUrl}/tipos-festivos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoFestivo[]> {
    return this.http.get<TipoFestivo[]>(this.baseUrl);
  }

  create(tipo: Omit<TipoFestivo, 'id'>): Observable<TipoFestivo> {
    return this.http.post<TipoFestivo>(this.baseUrl, tipo);
  }

  update(tipo: TipoFestivo): Observable<TipoFestivo> {
    return this.http.put<TipoFestivo>(`${this.baseUrl}/${tipo.id}`, tipo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
