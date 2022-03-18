
import { HttpClient } from '@angular/common/http';

import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'projects/my-lib/src/public-api';
import { Task } from 'projects/my-lib/src/public-api';
import { map, max } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isChecked = false;
  loadedTasks: Task[] = [];
  isImageProper: boolean = true;

  public taskForm = new FormGroup({
    description: new FormControl("", [Validators.required, Validators.minLength(10)]),
    media: new FormControl(""),
  });

  constructor(private http: HttpClient, private apiService: ApiService,){
  }

  task1: Task = {
    description: "",
    media: "",
  };
  
  fileChangeEvent(fileInput:any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20000;

      if (fileInput.target.files[0].size > max_size) {
          // console.error('Maximum size allowed is ' + max_size / 1000 + 'kB');
          this.isImageProper = false;
          return;
      }
      const reader = new FileReader();
      reader.onload = (e:any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.task1.media = e.target.result;
        }
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      this.isImageProper = true;
      return;
    }else{
      this.isImageProper = true;
      return;
    }
    
    
  }

  onSubmit(taskForm:any) {
    // taskForm.value.taskDescription = taskForm.value.taskDescription.trim();
    // if(taskForm.value.taskDescription.length===0){
    //   console.log('You can not submit empty data');
    //   return;
    // }
    this.task1.description = taskForm.value.taskDescription;

    if(this.isImageProper===true)
    this.onAddTask(this.task1.description,this.task1.media);
    else
      return;
  }


  ngOnInit() {
    this.onFetchTasks();
  }

  onFetchTasks(){
    this.apiService.getTasks().subscribe(
      tasks => {this.loadedTasks = tasks}
    )
  }

  onAddTask(desc:string|undefined, media:string|undefined){
    this.apiService.createTask(desc,media).pipe(map((task)=>{

    })).subscribe(
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
