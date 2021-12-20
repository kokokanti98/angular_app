import { Component, OnInit } from '@angular/core';
// on va importer l'interface ITask du fichier task.ts
import { ITask } from '../shared/models/task';
// On va importer les service taskListService
import { TaskListService } from '../shared/services/task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  // Variable tasks contient les données de tous les tâches
  public tasks: ITask[] = [];
  //variable pour le message d'erreur
  public errorMsg: string = '';
  // Varable pour le nb de  case cocher
  private nb_chk_case: number;
  // variable pour le pourcentage de completion la progressbar
  private _progress: number;
  constructor(private taskListService: TaskListService) { }

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
      // tasks => ici veut dire la listes des tasks du fichier json et this.tasks sera la liste des tasks de cette classe
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
  // Fonction pour récupérer le nb de case cocher par l'utilisateur
  public CaseCocher(CheckboxId: number): void{
    // On va stocker dans ce variable l'elemnent HTML CheckBox selectionner
    const selectedCheckBox = document.getElementById(CheckboxId.toString()) as HTMLInputElement;
    // Si la case à cocher selectionner n'est pas cocher va décrementer le nb
    if (selectedCheckBox.checked == false){
      this.nb_chk_case --;
    }
    //Sinon on inrecrement le nb
    else{
      this.nb_chk_case ++;
    }
    console.log("Nb de case cocher sont de :" + this.nb_chk_case);
    this.ChangerProgressBar(this.nb_chk_case);
  }
  // Fonction pour Reset
  public Reset(){
    // reinitialiser les variables
    this.nb_chk_case = 0;
    this._progress = 0;
    // uncheck tous les case à cocher
    // Boucle pour parcourir chaque checkbox
    for (let i = 1; i <= this.tasks.length; i++) {
      // On va stocker dans ce variable l'elemnent HTML CheckBox selectionner
      const selectedCheckBox = document.getElementById(i.toString()) as HTMLInputElement;
      // Si la case à cocher est cocher alors on va la non cocher
      if (selectedCheckBox.checked == true){
        selectedCheckBox.checked = false;
      }
    }
  }
  // Fonction pour changer la progression du progress bar
  public ChangerProgressBar(p_number: number){
    // variable pour le pourcentage le toFixed pour arrondir 2 chiffres après la virgule
    let percentage = ((p_number / this.tasks.length) * 100).toFixed(2);
    console.log("Le pourcentage actuel est de :" + percentage);
    const ProgessBarElem = document.getElementById('myBar') as HTMLInputElement;
    this._progress = +percentage;
    // Afficher sur l'écran si la progression est de 100% un message de félicitation
    if(+percentage == 100) {
      alert("Félicitations !");
    }
  }

}
