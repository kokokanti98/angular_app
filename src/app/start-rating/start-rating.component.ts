import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-start-rating',
  templateUrl: './start-rating.component.html',
  styleUrls: ['./start-rating.component.css']
})
export class StartRatingComponent implements OnChanges {

  // variable pour la taille des  étoiles
  public starWidth: number = 2;
  // variable qu'on va changer qui dépend de l'input du donnée parents = rating
  @Input()
  // valeur qui ca changer grâce au input qui va prendre la valeur de hotel.input du parent
  public rating: number = 2;
  constructor() { }

  ngOnChanges(): void{
    // multiplié par la largeur total du container 125px / 5
    this.starWidth = this.rating * 125 / 5;
  }

}
