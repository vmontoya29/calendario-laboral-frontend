import { Routes } from '@angular/router';
import { PaisesComponent } from './components/paises/paises.component';
import { TiposFestivosComponent } from './components/tipos-festivos/tipos-festivos.component';
import { FestivosComponent } from './components/festivos/festivos.component';
import { ConsultaFechaComponent } from './components/consulta-fecha/consulta-fecha.component';
import { FestivosAnualesComponent } from './components/festivos-anuales/festivos-anuales.component';
import { CalendarioAnualComponent } from './components/calendario-anual/calendario-anual.component';

// Definir las rutas
export const routes: Routes = [
  { path: 'paises', component: PaisesComponent },
  { path: 'tipos-festivos', component: TiposFestivosComponent },
  { path: 'festivos', component: FestivosComponent },
  { path: 'consulta-fecha', component: ConsultaFechaComponent },
  { path: 'festivos-anuales', component: FestivosAnualesComponent },
  { path: 'calendario-anual', component: CalendarioAnualComponent },
  { path: '', redirectTo: 'paises', pathMatch: 'full' },
  { path: '**', redirectTo: 'paises' }
];
