import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Service } from '../service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
  constructor( public serwis : Service, public ruter : Router ) {}

  u : any

  ngOnInit() : void 
  {
    this.serwis.aktualny().subscribe(res => this.u = res)
  }

  canActivate( next : ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean
  {
    this.serwis.aktualny().subscribe(res => this.u = res)
    if(this.u == null) this.ruter.navigate(['startowa'])    
    return true;
  }
  
}
