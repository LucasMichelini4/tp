import { Routes } from '@angular/router';
import { CreateTurnComponent } from './components/create-turn/create-turn.component';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'turnos/nuevo',
    pathMatch: 'full'
  },

  {
    path: 'turnos/nuevo',
    component: CreateTurnComponent
  }
];