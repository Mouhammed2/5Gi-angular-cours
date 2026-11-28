import { Routes } from '@angular/router';
import { Store } from './store/store';
import { TasksPage } from './tasks-page/tasks-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'store' },
  { path: 'store', component: Store },
  { path: 'tasks', component: TasksPage },
  { path: '**', redirectTo: 'store' },
];
