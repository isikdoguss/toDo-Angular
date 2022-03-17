
import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'projects/my-lib/src/public-api';
import { Task } from 'projects/my-lib/src/public-api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isChecked = false;
  loadedTasks: Task[] = [];
  
  
  constructor(private http: HttpClient, private apiService: ApiService){
  }

  ngOnInit() {
    this.onFetchTasks();
  }

  

  onFetchTasks(){
    this.apiService.getTasks().subscribe(
      tasks => {this.loadedTasks = tasks}
    )
  }

  onAddTask(data: {desc:string,media:string}){
    this.apiService.createTask(data.desc,data.media).subscribe(
      () => {this.onFetchTasks();}
      // responseData => {
        // console.log(responseData);
      // },
    );
  }

  onDeleteTask(id:number){
    this.apiService.deleteTask(id).subscribe(
      () => {this.onFetchTasks();}
    )
  }

  onCompleteEdited(completed: boolean , id: number){
    
    this.apiService.completeEdited(id, completed).subscribe(
      () => {this.onFetchTasks();}
    )
  }




}
