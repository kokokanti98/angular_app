import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
// on va importer l'interface ITask du fichier task.ts
import { ITask } from '../shared/models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {

  public title = 'liste des tâches aujourd\'hui';
  @Input()
  // valeur de la taille du tableau
  public list_length: number;
  constructor() { }

  ngOnChanges(): void{
    // 
  }

}
