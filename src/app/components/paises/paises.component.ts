import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-paises',
  standalone: true,                // 👈 agrega esto
  imports: [CommonModule, FormsModule], // 👈 importa lo necesario
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
  paises: Pais[] = [];
  pais: Pais = { id: 0, nombre: '' };
  editando = false;

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.paisService.getAll().subscribe({
      next: (data) => (this.paises = data),
      error: (err) => console.error('Error al cargar países:', err)
    });
  }

  guardar(): void {
    if (this.editando) {
      this.paisService.update(this.pais).subscribe(() => {
        this.cancelar();
        this.cargarPaises();
      });
    } else {
      const nuevo = { nombre: this.pais.nombre,id: this.pais.id };
      this.paisService.create(nuevo).subscribe(() => {
        this.cancelar();
        this.cargarPaises();
      });
    }
  }

  editar(p: Pais): void {
    this.pais = { ...p };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este país?')) {
      this.paisService.delete(id).subscribe(() => this.cargarPaises());
    }
  }

  cancelar(): void {
    this.pais = { id: 0, nombre: '' };
    this.editando = false;
  }
}
