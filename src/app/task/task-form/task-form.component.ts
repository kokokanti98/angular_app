import { Component, OnInit, Input } from '@angular/core';
// Importer du module qu'on a besoin pour le formulaire
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// on va importer l'interface ITask du fichier task.ts
import { ITask } from '../shared/models/task';
import { TaskListService } from '../shared/services/task-list.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  // Titre de la page de formulaire
  public pageTitle: string;
  // Variable pour le message d'erreur
  public errorMessage: string;
  // Formulaire
  public taskForm: FormGroup;
  
  // valeur de la tâche input selectionner qu'on va mettre dans le formulaire
  public selectedTaskInput: ITask;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskListService
  ) { }

  ngOnInit(): void{
    //
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250)]
      ]
    });
    // On va récuperer la valeur du champ id sur l'url
    this.route.paramMap.subscribe(params => {
      //l'assigner à une variable constante id
      const id = +params.get('id')!;
      console.log("ID maintenant est :" + id);
      this.getSelectedTask(id);
      // Lancer cette fonctions qui va récupérer les données de l'id de la tache selectionner
      //this.getSelectedHotel(id);
    })
    this.pageTitle = 'Créer une tâche';

  }
  // Fonction qui va declencher le service pour recuperer les données du tâche selectionner et le stocker dans la variable
  public getSelectedTask(id: number){
    this.taskService.getTaskById(id).subscribe(task => {
      // Afficher la tâche selectionner dans la console
      console.log(task);
      // Affecter sur la variable la tâche selectionner
      //this.selectedTaskInput = task;
      try {
          this.displayTask(task);
      }
      catch (error) {
      //console.error('Here is the error message', error);
      }
    })
   
  }
  // Pour afficher les valeurs de la tâche selectionner sur le formulaire
  public displayTask(task : ITask): void {
    this.selectedTaskInput = task;
    console.log("Inside display begin");
    console.log(this.selectedTaskInput);
    // Si l'id de la tâche est 0 ou non défini, change le titre de la page en Créer sinon Modifier
    if (task.id === 0 || !task.id) {
      this.pageTitle = 'Créer une tâche';
    } else {
      this.pageTitle = `Modifier une tâche ${task.taskName}`;
    }
    // On va mettre les valeurs de la variable task sur les champs du formulaire
    this.taskForm.patchValue({
      taskName: task.taskName
    });

  }
  public saveTask(): void {
    // Si notre formulaire est valide
    if(this.taskForm.valid){
      if(this.taskForm.dirty){

        const task: ITask =  {
          // retourner la valeur actuel de la tâche selectionner
          ...this.selectedTaskInput,
          // change la valeur de l'task
          ...this.taskForm.value
        }
        // Creer un nouveau task
        if( task.id === 0 || !task.id ){
            this.taskService.createTask(task).subscribe({
              error: (err) => this.errorMessage = err
            });
        }
        // Modifier un task
        else{
          // va déclencher la fonction dans le service pour faire un update(maj)
          this.taskService.updateTask(task).subscribe({
            error: (err) => this.errorMessage = err
          });
        }

      }
    }
    console.log(this.taskForm.value);
    this.saveCompleted();
  }
  // Fonction pouur supprimer une tache
  public deleteTask(): void {
    if (this.selectedTaskInput.id === 0) {
      this.saveCompleted();
    }
    // Si a tâche existe
    else {
      // Demander une confirmation à l'utilisateur avant de supprimer
      if (confirm(`Voulez-vous réelement supprimer ${this.selectedTaskInput.taskName} ?`)) {
        this.taskService.deleteTask(this.selectedTaskInput.id).subscribe({
          next: () => this.saveCompleted(),
          // Ici on va passer a errorMessage le message d'erreur afficher
          error: (err) => this.errorMessage = err
        });
      }
    }

  }
  // Fonction qui se déclenche après avoir finis d a pporter des changements ds la bdd
  public saveCompleted(): void{
    // Reset le formulaire
    this.taskForm.reset();
    // Redirection sur la page des liste des tâches
    this.router.navigate(['']);
  }
  // Pour changer l'url avec url ajout
  public AddNavTask(id : number){
    // Si id n existe pas alors on va changer l url
    if(!id || id == 0){
      this.router.navigate(['/tasks/0']);
    }
  }

}
