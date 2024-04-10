import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Service } from '../service';
import { IformErrors } from './IformErrors';

@Component({
  selector: 'app-formularz',
  templateUrl: './formularz.component.html',
  styleUrls: ['./formularz.component.css']
})

export class FormularzComponent implements OnInit
{
  
  przyklaodwyOpis = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.';
  przykaldowaSciezka = '../../assets/images/placeholder.jpg,';

  modelForm : FormGroup = this.formBuilder.group
  ({
    nazwa : ['', [Validators.required, Validators.maxLength(20)]],
    kraj : ['', [Validators.required, Validators.maxLength(20)]],
    dataStartu : ['', Validators.required],
    dataKonca : ['', Validators.required],
    cena : ['', [Validators.required, Validators.min(1)]],
    miejsca : ['', [Validators.required, Validators.min(1)]],
    opis : [this.przyklaodwyOpis, Validators.required],
    zdjecie : [this.przykaldowaSciezka, Validators.required]
  });

  constructor(private formBuilder : FormBuilder, private serwis : Service) {}
  
  ngOnInit() : void
  {
    this.modelForm.valueChanges.subscribe(() => {this.onControlValueChanged();});
    this.onControlValueChanged();
  }

  onSubmit(form : any) 
  {
    this.serwis.odczytaj().pipe(take(1)).subscribe((x : any) => 
    {
      let key = 0;
      for(let a of x) key = Math.max(a.id, key); 
      key++;
      let w = form.value;
      let pom : Array<any> = []
      for(let x of w.zdjecie.split(",").filter((x : string) => x.length > 0)) pom.push(x)
      let nowa = 
      {
        "id" : key,
        "nazwa" : w.nazwa, 
        "kraj" : w.kraj, 
        "dataStartu" : w.dataStartu,
        "dataKonca" : w.dataKonca,
        "cena" : w.cena,
        "miejsca" : parseInt(w.miejsca),
        "opis" : w.opis, 
        "zdjecie" : pom,
        "iloscOcen" : 0,
        "sumaOcen" : 0,
        "iloscZarezerwowanych" : 0
      }
      this.serwis.dodajWycieczke(nowa);
      this.modelForm = this.formBuilder.group
      ({
        nazwa : ['', [Validators.required, Validators.maxLength(20)]],
        kraj : ['', [Validators.required, Validators.maxLength(20)]],
        dataStartu : ['', Validators.required],
        dataKonca : ['', Validators.required],
        cena : ['',[Validators.required, Validators.min(1)]],
        miejsca : ['', [Validators.required, Validators.min(1)]],
        opis : [this.przyklaodwyOpis, Validators.required],
        zdjecie : [this.przykaldowaSciezka, Validators.required]
      });
      this.modelForm.valueChanges.subscribe(() => {this.onControlValueChanged();});
      this.onControlValueChanged();
    });
    
    
    
  }
  
  validationMessages : IformErrors = 
  {
    nazwa : 
    {
      required : 'Pole wymagane',
      maxlength : 'Za długa nazwa wycieczki'
    },
    kraj : 
    {
      required : 'Pole wymagane',
      maxlength : 'Za długa nazwa kraju'
    },
    dataStartu : 
    {
      required : 'Pole wymagane',
    },
    dataKonca : 
    {
      required: 'Pole wymagane',
    },
    cena : 
    {
      required : 'Pole wymagane / Podano tekst',
      min : 'Cena musi być większa od 0'
    },
    miejsca : 
    {
      required : 'Pole wymagane / Podano tekst',
      min : 'Ilość miejsc musi być większa od 0'
    },
    opis : 
    {
      required: 'Pole wymagane',
    },
    zdjecie : 
    {
      required : 'Pole wymagane',
    }
  };

  formErrors : IformErrors = 
  {
    nazwa : '',
    kraj : '',
    dataStartu : '',
    dataKonca : '',
    cena : '',
    miejsca : '',
    opis : '',
    zdjecie : ''
  };

  onControlValueChanged() : void 
  {
    const form = this.modelForm;
    for (let field in this.formErrors) 
    {
      this.formErrors[field as keyof IformErrors] = '';
      let control = form.get(field);
      if (control != null && !control.valid) 
      {
        const validationMessages = this.validationMessages[field as keyof IformErrors];
        for (const key in control.errors) 
          this.formErrors[field as keyof IformErrors] += validationMessages[key as keyof IformErrors] + ' ';
      }
    }
  }
}
/*
dodajWycieczke(w : any) : void
  {
    this.czyBrakForma = true;
    this.wycieczki.push(
     
    )
    this.obecneId += 1;
    this.wycieczkiPosortowane = [...this.wycieczki].sort((a, b) => a.cena - b.cena);
  }
*/

  

