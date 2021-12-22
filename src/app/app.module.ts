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
// Pour utiliser l'api d'Angular
import  { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// Importer le module pour utiliser Guard
import { TaskGuard } from './task/shared/guards/task.guard';
// import avec material
import {MatDividerModule} from '@angular/material/divider'; // list
import {MatListModule} from '@angular/material/list'; // list
import {MatCheckboxModule} from '@angular/material/checkbox'; // list
import {MatIconModule} from '@angular/material/icon'; // list
import {MatInputModule} from '@angular/material/input'; // form
import {MatButtonModule} from '@angular/material/button'; // form



import { AppComponent } from './app.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { TaskData } from './task/shared/api/tasks.data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// On va appeller puis en passant par paramètre la langue et son abbréviation dans le code
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    // Pour utiliser les FormGroup et autres
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      // Redirection vers home via '/tasks'
      { path: 'tasks', component: TaskListComponent },
      // Redirection vers home via '/tasks/id'
      // le guard pour sécuriser l'accès sur l'url par exemple si l'utilisateur entre en parametre id un varchar ou soit un nombre négatif
      // Ca va renvoyer directement sur la page /task
      { 
        path: 'tasks/:id', component: TaskListComponent,
        canActivate: [TaskGuard] 
      },
      // Redirection vers task quand on accède au serveur
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      // Pour redirection sur les pages en cas de 404 vers task
      { path: '**', redirectTo: 'tasks', pathMatch: 'full' }
    ]),
    // Afin d'utiliser l'API d'Angular, il faut preciser la class qu'on va exporter
    InMemoryWebApiModule.forFeature(TaskData),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
