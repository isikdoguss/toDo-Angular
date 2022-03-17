import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService} from 'projects/my-lib/src/public-api';
import { Task } from 'projects/my-lib/src/public-api'

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  
  oneTask: Task = {
    createdAt: new Date(),
    description: '',
    completed: false,
    updatedAt: new Date(),
    media: ''
  }
    
  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private location: Location,
              ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getTask(id)
      .subscribe(task => this.oneTask = task);
  }

  onEditTask(id: number, data: {desc:string,media:string}){
    this.apiService.editTask(id, data.desc, data.media).subscribe(
      () => {alert("Edited successfully!")}
    )
  }

  goBack(): void {
    this.location.back();
  }
}
