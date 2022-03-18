import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  error = new Subject<string>();
  url = 'https://622b473014ccb950d23522d1.mockapi.io/api/todo'

  constructor(private http: HttpClient) { }

  getTasks(){
      return this.http.get<Task[]>(this.url)
  }

  getTask(id: number){
    return this.http.get<Task>(this.url+ '/' + id);
  }

  createTask(description: string|undefined, media: string|undefined): Observable<Task> { // id ? verdigim icin eklemek zorunda degilim diye dusunuyorum xd
    const taskData: Task = { 
        createdAt: new Date(),
        description: description,
        completed: false,
        updatedAt: new Date(),
        media: media
    };
    return this.http.post<Task>(this.url, taskData)
  }
  
  editTask(id: number, description:string, media:string){   //createdAt eklenmedi yalnizca updatedAt
    const editedTaskData: Task = {
        description: description,
        updatedAt: new Date(),
        media: media
    };
    return this.http.put<Task>(this.url + '/' + id, editedTaskData)
  }

  completeEdited(id:number, completed: boolean){
      const completeData: Task = {
          completed: completed
      };
      return this.http.put<Task>(this.url + '/' + id, completeData)
  }

  deleteTask(id: number){
    return this.http.delete(this.url+'/'+id)
  }
    
}
