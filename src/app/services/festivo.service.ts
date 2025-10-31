import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Festivo } from '../models/festivo.model';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {
  private baseUrl = `${environment.apiUrl}/festivos`;

  constructor(private http: HttpClient) {}

  // CRUD base
  getAll(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(this.baseUrl);
  }

  create(festivo: Omit<Festivo, 'id'>): Observable<Festivo> {
    return this.http.post<Festivo>(this.baseUrl, festivo);
  }

  update(festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(`${this.baseUrl}/${festivo.id}`, festivo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ----- Endpoints especiales del backend -----

  // Valida si una fecha es festiva (query params: fecha=YYYY-MM-DD, paisId=#)
  validarFestivo(paisId: number, fechaISO: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/es-festivo`, {
      params: { fecha: fechaISO, paisId: String(paisId) }
    });
  }

  // Lista de festivos por país y año (ruta: /festivos/festivos/{paisId}/{anio})
  getFestivosAnio(paisId: number, anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/festivos/${paisId}/${anio}`);
  }

  // Calendario anual clasificado (objeto con listas: Festivos, Fines de semana, Laborales)
  getCalendario(paisId: number, anio: number): Observable<any> {
    return this.http.get<Record<string, string[]>>(`${this.baseUrl}/calendario/${paisId}/${anio}`);
  }
}
