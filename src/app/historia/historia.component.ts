import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit
{
  kupione : Array<any> = []
  waluta : any
  aktualnyStatus = "Wszystkie";

  constructor(private serwis : Service) {}

  ngOnInit(): void 
  {
    this.kupione = this.serwis.odczytajKupione();
    if(this.aktualnyStatus != "Wszystkie") this.kupione = this.kupione.filter(x => x.status == this.aktualnyStatus)
    this.serwis.odczytajOgolne().subscribe(res => this.waluta = res[0].waluta)
  }

  zmienStatus(w : any)
  {
    this.aktualnyStatus = w;
    this.kupione = this.serwis.odczytajKupione();
    if(this.aktualnyStatus != "Wszystkie") this.kupione = this.kupione.filter(x => x.status == this.aktualnyStatus)
  }
}
