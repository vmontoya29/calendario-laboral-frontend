import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaisService } from '../../services/pais.service';
import { FestivoService } from '../../services/festivo.service';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-calendario-anual',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./calendario-anual.component.html',
  styleUrls: ['./calendario-anual.component.css']
})
export class CalendarioAnualComponent {
  paises: Pais[] = [];
  paisId = 0;
  anio = new Date().getFullYear();

  calendario: any[] = []; 
  // espero algo tipo:
  // [{ fecha: "2025-01-01", tipoDia: "Día festivo" }, { fecha: "2025-01-02", tipoDia: "Día laboral" }, ...]

  constructor(
    private paisService: PaisService,
    private festivoService: FestivoService
  ) {
    this.paisService.getAll().subscribe(p => (this.paises = p));
  }

  generar(): void {
    if (!this.paisId || !this.anio) return;

    this.festivoService.getCalendario(this.paisId, this.anio).subscribe({
      next: (data) => {
        this.calendario = data;
      },
      error: (err) => {
        console.error('Error consultando calendario:', err);
        this.calendario = [];
      }
    });
  }
}
