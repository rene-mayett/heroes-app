import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private heroService:HeroesService){}

  searchHero():void{
    const valor:string = this.searchInput.value || '';
    console.log({valor});
    this.heroService.getSuggestions(valor).subscribe( h=>this.heroes = h);
  }

  onSelectedOption(event:MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }
    const hero:Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }

}
