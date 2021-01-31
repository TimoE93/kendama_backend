import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboListComponent } from './combo-list/combo-list.component';



@NgModule({
  declarations: [ComboListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ComboListComponent
  ]
})
export class ComboListModule { }
