import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { StronaComponent } from './strona/strona.component';
import { FormularzComponent } from './formularz/formularz.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KoszykComponent } from './koszyk/koszyk.component';
import { StartowaComponent } from './startowa/startowa.component';
import { RouterModule, Routes } from '@angular/router';
import { NawigacjaComponent } from './nawigacja/nawigacja.component';
import { StronaNieZnalezionaComponent } from './strona-nie-znaleziona/strona-nie-znaleziona.component';
import { SzczegolyComponent } from './szczegoly/szczegoly.component';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HistoriaComponent } from './historia/historia.component';
import { DatePipe } from '@angular/common';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestrowanieComponent } from './rejestrowanie/rejestrowanie.component';
import { AuthModule } from "@angular/fire/auth";
import { FirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from './guard/auth.guard';
import { PersystencjaComponent } from './persystencja/persystencja.component';


const routes : Routes = 
[
  { path: 'glowna', component: StronaComponent, canActivate: [AuthGuard] },
  { path: 'startowa', component: StartowaComponent },
  { path: 'koszyk', component: KoszykComponent , canActivate: [AuthGuard]},
  { path: 'dodawanie', component: FormularzComponent , canActivate: [AuthGuard]},
  { path: 'historia', component: HistoriaComponent , canActivate: [AuthGuard]},
  { path: 'persystencja', component: PersystencjaComponent , canActivate: [AuthGuard]},
  { path: 'logowanie', component: LogowanieComponent },
  { path: 'rejestrowanie', component: RejestrowanieComponent },
  { path: 'wycieczka/:id', component: SzczegolyComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: '/startowa', pathMatch: 'full' },
  { path: '**', component: StronaNieZnalezionaComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    WycieczkaComponent,
    StronaComponent,
    FormularzComponent,
    KoszykComponent,
    StartowaComponent,
    NawigacjaComponent,
    StronaNieZnalezionaComponent,
    SzczegolyComponent,
    HistoriaComponent,
    LogowanieComponent,
    RejestrowanieComponent,
    PersystencjaComponent
  ],
  imports: [
    [RouterModule.forRoot(routes)],
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AuthModule,
    FirestoreModule, 
    NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
