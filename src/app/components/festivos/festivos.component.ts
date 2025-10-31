import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FestivoService } from '../../services/festivo.service';
import { PaisService } from '../../services/pais.service';
import { TipoFestivoService } from '../../services/tipo-festivo.service';

import { Festivo } from '../../models/festivo.model';
import { Pais } from '../../models/pais.model';
import { TipoFestivo } from '../../models/tipo-festivo.model';

@Component({
  selector: 'app-festivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './festivos.component.html',
  styleUrls: ['./festivos.component.css']
})
export class FestivosComponent implements OnInit {
  festivos: Festivo[] = [];
  paises: Pais[] = [];
  tipos: TipoFestivo[] = [];

  // Inicializar los objetos de pais y tipoFestivo
  festivo: Festivo = {
    id: 0,
    nombre: '',
    dia: 1,
    mes: 1,
    tipoFestivo: { id: 0, tipo: '' },
    pais: { id: 0, nombre: '' }
  };

  editando = false;

  constructor(
    private festivoService: FestivoService,
    private paisService: PaisService,
    private tipoFestivoService: TipoFestivoService
  ) {}

  ngOnInit(): void {
    this.cargarFestivos();
    this.cargarPaises();
    this.cargarTiposFestivo();
  }

  cargarFestivos(): void {
    this.festivoService.getAll().subscribe({
      next: data => {
        this.festivos = data;
      },
      error: err => {
        console.error('Error cargando festivos:', err);
      }
    });
  }

  cargarPaises(): void {
    this.paisService.getAll().subscribe({
      next: data => {
        this.paises = data;
      },
      error: err => {
        console.error('Error cargando países:', err);
      }
    });
  }

  cargarTiposFestivo(): void {
    this.tipoFestivoService.getAll().subscribe({
      next: data => {
        this.tipos = data;
      },
      error: err => {
        console.error('Error cargando tipos festivo:', err);
      }
    });
  }

  guardar(): void {
    if (this.editando) {
      this.festivoService.update(this.festivo).subscribe(() => {
        this.cancelar();
        this.cargarFestivos();
      });
    } else {
      const nuevo = {
        nombre: this.festivo.nombre,
        dia: this.festivo.dia,
        mes: this.festivo.mes,
        tipoFestivo: this.festivo.tipoFestivo,
        pais: this.festivo.pais
      };
      this.festivoService.create(nuevo).subscribe(() => {
        this.cancelar();
        this.cargarFestivos();
      });
    }
  }

  editar(f: Festivo): void {
    this.festivo = { ...f };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este festivo?')) {
      this.festivoService.delete(id).subscribe(() => this.cargarFestivos());
    }
  }

  cancelar(): void {
    this.festivo = {
      id: 0,
      nombre: '',
      dia: 1,
      mes: 1,
      tipoFestivo: { id: 0, tipo: '' },
      pais: { id: 0, nombre: '' }
    };
    this.editando = false;
  }
}
