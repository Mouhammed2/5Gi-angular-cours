import { Routes } from '@angular/router';
import { Store } from './store/store';
import { TasksPage } from './tasks-page/tasks-page';

export const routes: Routes = [
  { path: '', component: TasksPage },
  { path: 'store', component: Store },
  { path: '**', redirectTo: '' },
];
