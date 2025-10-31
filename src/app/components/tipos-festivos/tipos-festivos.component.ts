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
  tipo: TipoFestivo = { id: 0, nombre: '', descripcion: '', tipo: '' }; // Inicializamos un objeto vacío para crear/editar un tipo de festivo
  editando = false; // Controla si estamos en modo de edición o creación

  constructor(private tipoFestivoService: TipoFestivoService) {}

  ngOnInit(): void {
    this.cargarTipos(); // Al iniciar, cargamos los tipos de festivos desde el backend
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
        this.cancelar(); // Limpiamos el formulario
        this.cargarTipos(); // Recargamos la lista de tipos de festivos
      });
    } else {
      // Si estamos creando un tipo nuevo, lo enviamos al backend
      const nuevo = {
        nombre: this.tipo.nombre,
        descripcion: this.tipo.descripcion,
        tipo: this.tipo.tipo // Añadir el campo 'tipo' aquí
      };
      this.tipoFestivoService.create(nuevo).subscribe(() => {
        this.cancelar(); // Limpiamos el formulario
        this.cargarTipos(); // Recargamos la lista de tipos de festivos
      });
    }
  }

  // Método para cargar los datos de un tipo de festivo al formulario para edición
  editar(t: TipoFestivo): void {
    this.tipo = { ...t }; // Cargamos los datos del tipo seleccionado en el formulario
    this.editando = true; // Establecemos el modo de edición
  }

  // Método para eliminar un tipo de festivo
  eliminar(id: number): void {
    if (confirm('¿Eliminar este tipo de festivo?')) {
      this.tipoFestivoService.delete(id).subscribe(() => this.cargarTipos()); // Si confirmamos, eliminamos y recargamos la lista
    }
  }

  // Método para cancelar la creación o edición y limpiar el formulario
  cancelar(): void {
    this.tipo = { id: 0, nombre: '', descripcion: '', tipo: '' }; // Limpiamos los datos del formulario
    this.editando = false; // Desactivamos el modo de edición
  }
}
