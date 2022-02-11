import { InMemoryDbService } from 'angular-in-memory-web-api';
// Inclure notre Model
import {ITask} from '../models/task';

export class TaskData implements InMemoryDbService{
  
  createDb(): Record<string, ITask[]>{
    const tasks: ITask[] = [
      {
        id: 1,
        taskName: 'Tâche 1'
      }, 
      {
        id: 2,
        taskName: 'Tâche 2'
      }, 
      {
        id: 3,
        taskName: 'Tâche 3'
      }, 
      {
        id: 4,
        taskName: 'Tâche 4'
      },
      {
        id: 5,
        taskName: 'Tâche 5'
      },
      {
        id: 6,
        taskName: 'Tâche 6'
      },
      {
        id: 7,
        taskName: 'Tâche 7'
      }
    ];

    return { tasks };
  }

  genId(tasks: ITask[]): number{
    // Si la liste tasks est non vide alors on va prendre le max id sur les champs id de la liste 
    // Puis on va mettre + 1 sinon sa valeur sera 1
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}