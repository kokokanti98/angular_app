import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
// Importer du module qu'on a besoin pour le formulaire
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// on va importer l'interface ITask du fichier task.ts
import { ITask } from '../shared/models/task';
import { TaskListService } from '../shared/services/task-list.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {

  public title = 'liste des tâches aujourd\'hui';
  public taskForm: FormGroup;
  // Variable IHotel
  public task: ITask;
  @Input()
  // valeur de la taille du tableau
  public list_length: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskListService
  ) { }

  ngOnChanges(): void{
    // 
  }

}
