import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../service';

@Component({
  selector: 'app-szczegoly',
  templateUrl: './szczegoly.component.html',
  styleUrls: ['./szczegoly.component.css']
})
export class SzczegolyComponent
{
  id : any;

  constructor(private sciezka : ActivatedRoute, public serwis : Service) 
  {
    this.serwis.odczytajOgolne().subscribe(res => this.waluta = res[0].waluta)
    this.opinie = this.serwis.odczytajOpinie()
    this.sciezka.params.subscribe(params => {this.id = params["id"];})
    this.serwis.odczytaj().subscribe(res => 
      {
        this.dane = res.filter((x : any) => x.id == this.id)[0]
      }); 
  }
 
  priorytet : any = '0';
  waluta : any;

  wystawionaOcena : any = 0;
  dane : any;

  czy = true

  opinie : Array<any> = []

  aktaulneZdjecie = 0

  ngOnInit() : void 
  {
     
  }

  dodaj() : void 
  {
    if(this.dane.iloscZarezerwowanych < this.dane.miejsca)
    {
      this.dane.iloscZarezerwowanych++;
      this.serwis.zmienIloscZarezerowowanych(this.dane);
    }
  }

  usun() : void 
  {
    if(this.dane.iloscZarezerwowanych > 0)
    {
      this.dane.iloscZarezerwowanych--;
      this.serwis.zmienIloscZarezerowowanych(this.dane);
    }
  }

  async dodajOcene()
  {
    this.dane.sumaOcen += this.wystawionaOcena;
    this.dane.iloscOcen += 1;
    this.serwis.zmienWycieczke(this.dane);
    await this.czekaj(100);
    this.wystawionaOcena = 0;
  }
  
  async czekaj(ms : number) 
  {
    return new Promise( resolve => setTimeout(resolve, ms) );
  } 

  wPrawo()
  {
    this.aktaulneZdjecie = (this.aktaulneZdjecie + 1) % this.dane.zdjecie.length
  }
  wLewo()
  {
    if(this.aktaulneZdjecie == 0) this.aktaulneZdjecie = this.dane.zdjecie.length - 1;
    else this.aktaulneZdjecie--;
  }
  stworz(nick : string, nazwa : string, opis : string, data : string) : any 
  {
    let czy = false
    if (nick.length > 0 && nazwa.length > 0 && opis.length > 50 && opis.length < 500)
    {
      let opinia = 
      {
        "nick" : nick,
        "nazwa" : nazwa,
        "opis" : opis,
        "data" : data
      };
     this.serwis.dodajOpinie(opinia)
     this.opinie = this.serwis.odczytajOpinie()
     czy = true
    }
    else if(opis.length >= 500) alert("Recenzja musi być krótsza niż 500 znaków");
    else if(nick.length == 0) alert("Nick jest wymagany");
    else if(nazwa.length == 0) alert("Nazwa wycieczki jest wymagana");
    else alert("Recenzja jest wymagana i musi mieć conajmiej 51 znaków");
    if (czy) return ''
    else return opis
  }
}
