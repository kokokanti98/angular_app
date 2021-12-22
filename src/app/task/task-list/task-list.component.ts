import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
// on va importer l'interface ITask du fichier task.ts
import { ITask } from '../shared/models/task';
import { Router } from '@angular/router';
// On va importer les service taskListService
import { TaskListService } from '../shared/services/task-list.service';
import { MatCheckbox } from '@angular/material/checkbox';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  // Pour  avoir la liste des checkbox 
  @ViewChildren("checkboxes") checkboxes: QueryList<MatCheckbox>;
  // Titre pour la liste des tâches
  public titleTaslList = 'liste des tâches aujourd\'hui';
  // Variable tasks contient les données de tous les tâches
  public tasks: ITask[] = [];
  //variable pour le message d'erreur
  public errorMsg: string = '';
  // Varable pour le nb de  case cocher
  private nb_chk_case: number;
  // variable pour le pourcentage de completion la progressbar
  private _progress: number;

  constructor(
    private taskListService: TaskListService,
    private router: Router,
  ) { }

  // Getteur de _progress
  public get progress(): number{
    return this._progress;
  }
  // Setteur de _progress
  public set progress(percentage: number){
    //va changer la variable _progress
    this._progress = percentage;
  }

  ngOnInit(): void {
    // Va déclencher la fonction pour prendre tous les tâches dans la base de données
    this.taskListService.getTasks().subscribe({
      // next et error sont deux fonctions de base dans le subscribe
      // tasks => ici veut dire la listes des tâches du fichier format json de l'api et this.tasks sera la liste des tasks de cette classe
      next: tasks => {
        // insérer la liste des tasks recus dans le fichier json dans la variable
        this.tasks = tasks;
      },
      error: err => this.errorMsg = err
    });
    // On fixe la valeur pour le moment
    this._progress = 0;
    this.nb_chk_case = 0;
  }
  
  // Fonction pour Reset
  public Reset(){
    // Va demander la confirmation à l'utilisateur avant d'éxecuter le reset
    if(confirm("Etes-vous sure de vouloir recommencer ?")) {
      // reinitialiser les variables
      this.nb_chk_case = 0;
      this._progress = 0;
      //console.log(this.checkboxes);
      // va parcourir this.checkboxes et pour chaque checkbox de type MatCheckbox va décocher la case
      this.checkboxes.forEach((checkbox: MatCheckbox) => {
        //console.log('valeur de checked est:' + checkbox.checked + "sur l'id :" + checkbox.id);
        // Va décocher tous les case à cocher
        checkbox.checked = false;
      });
    }
  }
  // Fonction pour changer la progression du progress bar
  public ChangerProgressBar(p_number: number){
    // variable pour le pourcentage le toFixed pour arrondir 2 chiffres après la virgule
    let percentage = ((p_number / this.tasks.length) * 100).toFixed(2);
    //console.log("Le pourcentage actuel est de :" + percentage);
    // Pour changer la valeur du progress bar
    this._progress = +percentage;
    // Afficher sur l'écran si la progression est de 100% un message de félicitation
    if(+percentage == 100) {
      alert("Félicitations !");
    }
  }

  // Pour naviguer entre les différentes tâches
  public getSelectedId(id: number){
    this.router.navigate(['/tasks/'+ id]);
  }
  // Fonction pour récupérer le nb de case cocher par l'utilisateur
  public CaseCocher($event: any): void{
    console.log($event.source);
    console.log($event.source.id);
    //console.log($event.source._checked);
    if ($event.source._checked == false){
      this.nb_chk_case --;
    }
    else{
      this.nb_chk_case ++;
    }
    console.log("Nb de case cocher sont de :" + this.nb_chk_case);
    this.ChangerProgressBar(this.nb_chk_case);
  }
}