import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService:TokenService, private router: Router, private serviceUtilisateur:UtilisateurService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   if(this.tokenService.getToken() !== null){
    const role=route.data["roles"]
    if(role){
     const match = this.serviceUtilisateur.roleMatch(role)
     if(match){
      return true
     }
     else{
      this.router.navigate(['/notFount'])
      return false
     }
    }
   }
   this.router.navigate(['/login'])
   return false
  }
  
}
