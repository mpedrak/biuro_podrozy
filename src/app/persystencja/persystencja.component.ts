import { Component } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-persystencja',
  templateUrl: './persystencja.component.html',
  styleUrls: ['./persystencja.component.css']
})
export class PersystencjaComponent 
{
  constructor(private serwis : Service) {}
  
  zmienToNaP(w : any)
  {
    this.serwis.zmienToNaP(w);
  }
}
