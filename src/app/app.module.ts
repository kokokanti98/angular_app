import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Afin d'utiliser le ngModel
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Nous permettra d'enregistrer une nouvelle langue. Vient du paquet angular/common
import { registerLocaleData } from '@angular/common';
// Importer la langue francaise
import localeFr from '@angular/common/locales/fr';
// importer HttpClientModule du paquet angular/common/http pour utiliser HttpClient
import { HttpClientModule } from '@angular/common/http';
// Pour utiliser le routage
import { RouterModule } from '@angular/router';
import  { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { TaskData } from './task/shared/api/tasks.data';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // Pour utiliser les FormGroup et autres
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      // Redirection vers home via '/tasks'
      { path: 'tasks', component: TaskListComponent },
      // Redirection vers home via '/tasks/id'
      { path: 'tasks/:id', component: TaskListComponent },
      // Redirection vers task quand on accède au serveur
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      // Pour redirection sur les pages en cas de 404 vers task
      { path: '**', redirectTo: 'tasks', pathMatch: 'full' }
    ]),
    // Afin d'utiliser l'API d'Angular, il faut preciser la class qu'on va exporter
    InMemoryWebApiModule.forFeature(TaskData)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
