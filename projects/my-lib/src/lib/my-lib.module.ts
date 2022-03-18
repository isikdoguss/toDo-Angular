import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyLibComponent } from './my-lib.component';



@NgModule({
  declarations: [
    MyLibComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MyLibComponent
  ]
})
export class MyLibModule { }
