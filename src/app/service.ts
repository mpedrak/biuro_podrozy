import { Injectable} from '@angular/core';
import { filter, Observable } from 'rxjs';
import { of } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { take} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';


@Injectable
({
  providedIn: 'root'
})

export class Service
{
    wycieczki : Observable<any[]>
    ogolne : Observable<any[]>

    uzytkownik : Observable<any>

    kupione : Array<any> = []
    opinie : Array<any> = []

    constructor(private baza : AngularFireDatabase, private autentykacja : AngularFireAuth, private ruter : Router) 
    { 
        this.wycieczki = this.baza.list('wycieczki').valueChanges();
        this.ogolne = this.baza.list('ogolne').valueChanges();
        this.uzytkownik = autentykacja.authState;
    }
    
    odczytaj() : Observable<any[]>
    {
        return this.wycieczki;
    }

    odczytajOgolne() : Observable<any[]>
    {
        return this.ogolne
    }


    zmienWycieczke(dane : any)
    {
        this.baza.list('wycieczki').snapshotChanges().pipe(take(1)).subscribe((wycieczki : any) =>
        {
        for(let x of wycieczki)
            if(x.payload.val().id == dane.id)
            {
                this.baza.list('wycieczki').update(x.payload.key, 
                    {
                        "id" : dane.id,
                        "nazwa" : dane.nazwa, 
                        "kraj" : dane.kraj, 
                        "dataStartu" : dane.dataStartu,
                        "dataKonca" : dane.dataKonca,
                        "cena" : dane.cena,
                        "miejsca" : parseInt(dane.miejsca),
                        "opis" : dane.opis, 
                        "zdjecie" : dane.zdjecie,
                        "iloscOcen" : dane.iloscOcen,
                        "sumaOcen" : dane.sumaOcen,
                        "iloscZarezerwowanych" : dane.iloscZarezerwowanych
                    }
                    )
                break;
            }   
        })
    }
    zmienIloscZarezerowowanych(dane : any)
    {
        this.baza.list('wycieczki').snapshotChanges().pipe(take(1)).subscribe((wycieczki : any) =>
        {
        for(let x of wycieczki)
            if(x.payload.val().id == dane.id)
            {
                this.baza.list('wycieczki').update(x.payload.key, 
                    {
                        "iloscZarezerwowanych" : dane.iloscZarezerwowanych
                    }
                    )
                break;
            }   
        })
    }
    
    dodajWycieczke(dane : any)
    {
        this.baza.list('wycieczki').push(dane);
    }

    usunWycieczke(dane : any)
    {
       this.baza.list('wycieczki').snapshotChanges().pipe(take(1)).subscribe((wycieczki : any) =>
       {
         for(let x of wycieczki)
           if(x.payload.val().id == dane.id)
           {
             this.baza.list('wycieczki').remove(x.payload.key)
             break
           }   
       })
    }

    setWaluta(w : any)
    {
        this.baza.list('ogolne').snapshotChanges().pipe(take(1)).subscribe((ogolne : any) =>
        {
            for(let x of ogolne) this.baza.list('ogolne').update(x.payload.key, {"waluta" : w})  
        })
    }

    dodajOpinie(w : any)
    {
        this.opinie.push(w);
    }

    odczytajOpinie()
    {
        return this.opinie
    }

    dodajDoKupionych(dane : any)
    {
        this.kupione.push(dane);
    }

    odczytajKupione()
    {
        return this.kupione;
    }

    async zaloguj(login : any, haslo : any)
    {
        return this.autentykacja.signInWithEmailAndPassword(login, haslo)
            .then((result) => { localStorage.setItem('user', JSON.stringify(result));  this.ruter.navigate(['startowa']); })
            .catch((error) => { window.alert(error.message); })
    }

    async zarejestruj(login : any, haslo : any) 
    {
        return this.autentykacja.createUserWithEmailAndPassword(login, haslo)
            .then((result) => { localStorage.setItem('user', JSON.stringify(result)); this.ruter.navigate(['startowa']);})
            .catch((error) => { window.alert(error.message) })
    }

    async wyloguj() 
    {
        return this.autentykacja.signOut().then(() => 
        {
            localStorage.removeItem('user');
            this.ruter.navigate(['startowa']);
        })
    }

    aktualny() : Observable<any>
    {
        return this.uzytkownik
    }

    async zmienToNaP(w : any)
    {
        return this.autentykacja.setPersistence(w).then(() => {});
    }
}