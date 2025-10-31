import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // IMPORTANTE: Importa RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // Asegúrate de agregar RouterModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calendarios Laborales';
}
