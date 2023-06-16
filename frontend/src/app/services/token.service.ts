import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  saveRole(roles: string){
    localStorage.setItem('roles', JSON.stringify(roles))
  }

  getRoles():string{
   let a = JSON.parse(localStorage.getItem("roles")!)
  return a
  }

  saveId(id: number){
    localStorage.setItem('id', JSON.stringify(id))
  }

  getId():string{
   let a = JSON.parse(localStorage.getItem("id")!)
  return a
  }

  saveRefreshToken(refreshToken: string){
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
  }

  getRefreshToken():any{
    return JSON.parse(localStorage.getItem('refreshToken')!)
  }

  saveToken(token: string){
    localStorage.setItem('token', JSON.stringify(token))
    //this.router.navigate(['/dashboardMedecin'])
  }
  isLogged() {
    return this.getRoles() && this.getToken()
  }
  clearToken(): void{
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('roles')
    localStorage.removeItem('id')
    this.router.navigate(['/login'])
  }
  getToken(): string {
    return JSON.parse(localStorage.getItem('token')!)
  }
  clearTokenExpired(): void{
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
