import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Service } from '../service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit
{
  wycieczki : Array<any> = []
  waluta : any
  dataPom : number = Date.now()

  constructor(public serwis : Service, private datePipe : DatePipe) {}

  ngOnInit() : void 
  {
    this.serwis.odczytajOgolne().subscribe(res => this.waluta = res[0].waluta)
      this.serwis.odczytaj().subscribe(res => this.wycieczki = 
        res.filter((x : {iloscZarezerwowanych : number} ) => x.iloscZarezerwowanych > 0))
  }

  zmienWalute(w : any)
  {
    this.serwis.setWaluta(w);
    this.serwis.odczytajOgolne().subscribe(res => this.waluta = res[0].waluta)
  }

  kup(id : any)
  {
    let dane = this.wycieczki.filter(x => x.id == id)[0]
    let data = this.datePipe.transform(this.dataPom, 'yyyy-MM-dd');
    let status = ""
    if (data != null && dane.dataStartu > data) status = "Oczekujaca";
    else if (data != null && dane.dataKonca < data) status = "Archiwalna";
    else status = "Aktywna";
    this.serwis.dodajDoKupionych({"dane" : dane, "data" : data, "biletow" : dane.iloscZarezerwowanych, "status" : status})
    // tu usuwać dostepne miejsca z wycieczki jeśli kupione będą podpięte pod baze
    dane.iloscZarezerwowanych = 0;
    this.serwis.zmienWycieczke(dane);
  }


}
