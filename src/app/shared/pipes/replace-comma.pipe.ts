// Un exemple de Pipe personnalisé
//on va importer le module Pipe du paquet angular core
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceComma'
})

export class ReplaceComma  implements PipeTransform{
  
  transform(value: string): string {
    // Si  value est ni undefined ni none
    if (!!value) {
      // remplace la virgule avec une expression régulière-> remplace la virgule par un point
      return value.replace(/,/g, ".");
    } else {
      return "";
    }
  }

}