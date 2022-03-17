import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MyLibComponent } from './my-lib.component';



@NgModule({
  declarations: [
    MyLibComponent
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    MyLibComponent
  ]
})
export class MyLibModule { }
