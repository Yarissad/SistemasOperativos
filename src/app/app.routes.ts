import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },

  {
    path: 'wizard/:tipo',
    loadComponent: () => import('./components/wizard/wizard.component').then(m => m.WizardComponent)
  },
  {
    path: 'resultados/:tipo/:id',
    loadComponent: () => import('./components/resultados/resultados.component').then(m => m.ResultadosComponent)
  },
  {
    path: 'resultados',
    loadComponent: () => import('./components/resultados-list/resultados-list.component').then(m => m.ResultadosListComponent)
  }
];
