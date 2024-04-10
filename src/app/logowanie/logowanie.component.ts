import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../service';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent 
{
  constructor(private serwis : Service) {}
  
  zaloguj(l : any, h : any)
  {
    this.serwis.zaloguj(l, h)
  }
}
