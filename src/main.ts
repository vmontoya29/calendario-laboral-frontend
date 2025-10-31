import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Inicializamos la aplicación con las rutas y los servicios necesarios
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Proveer las rutas
    provideHttpClient(withFetch()),  // Proveer el cliente HTTP
    importProvidersFrom(FormsModule)  // Proveer otros módulos si se necesitan
  ]
}).catch(err => console.error(err));
