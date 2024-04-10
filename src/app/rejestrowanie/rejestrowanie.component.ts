import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../service';

@Component({
  selector: 'app-rejestrowanie',
  templateUrl: './rejestrowanie.component.html',
  styleUrls: ['./rejestrowanie.component.css']
})
export class RejestrowanieComponent 
{
  constructor(private serwis : Service) {}
  
  zrob(l : any, h1 : any, h2 : any)
  {
    if(h1 != h2) window.alert("Hasła nie są takie same");
    else this.serwis.zarejestruj(l, h1);
  }
}
