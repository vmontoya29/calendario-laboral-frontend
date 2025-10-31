import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaisService } from '../../services/pais.service';
import { FestivoService } from '../../services/festivo.service';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-festivos-anuales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './festivos-anuales.component.html',
  styleUrls: ['./festivos-anuales.component.css']
})
export class FestivosAnualesComponent {
  paises: Pais[] = [];
  paisId = 0;
  anio = new Date().getFullYear();

  festivos: any[] = [];

  constructor(
    private paisService: PaisService,
    private festivoService: FestivoService
  ) {
    this.paisService.getAll().subscribe(p => (this.paises = p));
  }

  consultar(): void {
    if (!this.paisId || !this.anio) return;

    this.festivoService.getFestivosAnio(this.paisId, this.anio).subscribe({
      next: (data) => {
        // se espera array tipo [{fecha:'2023-01-01', nombre:'Año nuevo', tipo:'Fijo'}, ...]
        this.festivos = data;
      },
      error: (err) => {
        console.error('Error consultando festivos del año:', err);
        this.festivos = [];
      }
    });
  }
}
