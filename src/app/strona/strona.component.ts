import { Component, OnInit, Output  } from '@angular/core';
import { take } from 'rxjs';
import { Service } from '../service';

@Component({
  selector: 'app-strona',
  templateUrl: './strona.component.html',
  styleUrls: ['./strona.component.css']
})
export class StronaComponent implements OnInit
{
  wycieczki : Array<any> = []
  wycieczkiPosortowane : Array<any> = [];
  waluta : any

  constructor(public serwis : Service) { }

  ngOnInit() : void 
  {
    this.serwis.odczytaj().pipe(take(1)).subscribe(res => this.wycieczki = res);
    this.serwis.odczytaj().pipe(take(1)).subscribe(res => this.wycieczkiPosortowane = 
      res.sort(((a : { cena : any }, b : { cena : any }) => a.cena - b.cena)));
    this.serwis.odczytajOgolne().subscribe(res => this.waluta = res[0].waluta)
  }
  
  update() : void 
  {
    this.serwis.odczytaj().pipe(take(2)).subscribe(res => this.wycieczki = res);
    this.serwis.odczytaj().pipe(take(2)).subscribe(res => this.wycieczkiPosortowane = 
      res.sort(((a : { cena : any }, b : { cena : any }) => a.cena - b.cena)));
  }
}
