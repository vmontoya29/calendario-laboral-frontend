import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoFestivoService } from '../../services/tipo-festivo.service';
import { TipoFestivo } from '../../models/tipo-festivo.model';

@Component({
  selector: 'app-tipos-festivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipos-festivos.component.html',
  styleUrls: ['./tipos-festivos.component.css']
})
export class TiposFestivosComponent implements OnInit {
  tipos: TipoFestivo[] = [];
  tipo: TipoFestivo = { id: 0, tipo: '' }; 
  editando: boolean = false;
  constructor(private tipoFestivoService: TipoFestivoService) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  // Método para cargar los tipos de festivos desde el servicio
  cargarTipos(): void {
    this.tipoFestivoService.getAll().subscribe({
      next: (data) => (this.tipos = data), // Si la petición es exitosa, asignamos los tipos a la lista
      error: (err) => console.error('Error cargando tipos:', err) // Si hay un error, lo mostramos en la consola
    });
  }

  // Método para guardar (crear o actualizar) un tipo de festivo
  guardar(): void {
    if (this.editando) {
      // Si estamos en modo de edición, actualizamos el tipo
      this.tipoFestivoService.update(this.tipo).subscribe(() => {
        this.cancelar(); 
        this.cargarTipos();
      });
    } else {
      
      const nuevo = {      
        tipo: this.tipo.tipo       
      };
      this.tipoFestivoService.create(nuevo).subscribe(() => {
        this.cancelar(); 
        this.cargarTipos(); 
      });
    }
  }

  // Método para cargar los datos de un tipo de festivo al formulario para edición
  editar(t: TipoFestivo): void {
    this.tipo = { ...t }; 
    this.editando = true;
  }

  // Método para eliminar un tipo de festivo
  eliminar(id: number): void {
    if (confirm('¿Eliminar este tipo de festivo?')) {
      this.tipoFestivoService.delete(id).subscribe(() => this.cargarTipos()); 
    }
  }

  // Método para cancelar la creación o edición y limpiar el formulario
  cancelar(): void {
    this.tipo = { id: 0, tipo: '' }; 
    this.editando = false; 
  }
}
