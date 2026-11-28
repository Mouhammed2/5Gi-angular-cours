import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Task } from '../task/task';

/** Page /tasks : la démo des tâches et des signals. */
@Component({
  selector: 'app-tasks-page',
  imports: [Header, Task],
  template: `
    <app-header></app-header>
    <app-task></app-task>
  `,
})
export class TasksPage {}
