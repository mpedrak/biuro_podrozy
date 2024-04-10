import { Component } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-nawigacja',
  templateUrl: './nawigacja.component.html',
  styleUrls: ['./nawigacja.component.css']
})
export class NawigacjaComponent 
{
  constructor(public serwis : Service) { }

  wycieczki : Array<any> = []
  suma = 0
  ilosc = 0
  waluta : any
  pokaz = false;
  ileOczekujacych = 0
  oczekujace : Array<any> = []
  uzytkownik : any;

  ngOnInit() : void 
  {
    this.serwis.odczytajOgolne().subscribe(res => this.waluta = res[0].waluta)
    this.serwis.aktualny().subscribe(res => this.uzytkownik = res)
    this.serwis.odczytaj().subscribe(res => 
      {
        this.wycieczki = res.filter((x : {iloscZarezerwowanych : number}) => x.iloscZarezerwowanych > 0);
        this.ilosc = 0
        this.suma = 0
        for (let x of this.wycieczki) 
        {
          this.suma += x.iloscZarezerwowanych * x.cena;
          this.ilosc += x.iloscZarezerwowanych;
        }
      });
    this.update()
  }

  async update()
  {
    while(true) // tymczasowe rozwiązanie, kiedy kupione wycieczki nie są podpięte do bazy i nie ma observable
    {
      this.oczekujace = this.serwis.odczytajKupione().filter(x => x.status == "Oczekujaca");
      this.ileOczekujacych = this.oczekujace.length;
      await this.czekaj(50); 
    }
  }

  mE()
  { 
    if(this.ileOczekujacych > 0) this.pokaz = true
  }

  mL()
  {
    this.pokaz = false
  }

  async czekaj(ms : number) 
  {
    return new Promise( resolve => setTimeout(resolve, ms) );
  } 

  wyloguj()
  {
    this.serwis.wyloguj();
  }
}
