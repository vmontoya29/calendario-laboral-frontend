import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaisService } from '../../services/pais.service';
import { FestivoService } from '../../services/festivo.service';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-consulta-fecha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-fecha.component.html',
  styleUrls: ['./consulta-fecha.component.css']
})
export class ConsultaFechaComponent {
  paises: Pais[] = [];
  paisId = 0;
  fecha = ''; // formato yyyy-MM-dd
  resultado = '';

  constructor(
    private paisService: PaisService,
    private festivoService: FestivoService
  ) {
    this.paisService.getAll().subscribe(p => (this.paises = p));
  }

  consultar(): void {
    if (!this.paisId || !this.fecha) {
      this.resultado = 'Seleccione un país y una fecha.';
      return;
    }

    this.festivoService.validarFestivo(this.paisId, this.fecha).subscribe({
      next: (resp: any) => {
        // asumo backend responde { mensaje: "...", ... }
        this.resultado = resp.mensaje ?? JSON.stringify(resp);
      },
      error: (err) => {
        this.resultado = err?.error?.mensaje ?? 'Error consultando el servicio.';
      }
    });
  }
}
