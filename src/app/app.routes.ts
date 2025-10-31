import { Routes } from '@angular/router';
import { FestivosComponent } from './components/festivos/festivos.component';
import { PaisesComponent } from './components/paises/paises.component';
import { TiposFestivosComponent } from './components/tipos-festivos/tipos-festivos.component';

export const routes: Routes = [
  { path: 'festivos', component: FestivosComponent },
  { path: 'paises', component: PaisesComponent },
  { path: 'tipos-festivos', component: TiposFestivosComponent },
  { path: '', redirectTo: '/festivos', pathMatch: 'full' },
  { path: '**', redirectTo: '/festivos' }
];
