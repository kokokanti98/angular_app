import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Afin d'utiliser le ngModel
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importer le pipe personnalisé qui va remplacé les virgule par un point d'une valeur
// import { ReplaceComma } from './pipes/replace-comma.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
