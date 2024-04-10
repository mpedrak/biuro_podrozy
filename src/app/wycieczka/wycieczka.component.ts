import { Component, EventEmitter, Input, Output} from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../service';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrls: ['./wycieczka.component.css']
  
})
export class WycieczkaComponent 
{
  @Input() id : any;
  @Input() priorytet : any = '0';
  @Input() waluta : any;

  @Output() update = new EventEmitter<any>();

  wystawionaOcena : any = 0;
  dane : any;
  
  constructor(public serwis : Service) { }

  ngOnInit() : void 
  {
    this.serwis.odczytaj().subscribe(res => 
      {
        this.dane = res.filter((x : any) => x.id == this.id)[0]
      });  
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

  usunWycieczke() : void 
  {
    this.serwis.usunWycieczke(this.dane)
    this.update.emit();
  }
}
