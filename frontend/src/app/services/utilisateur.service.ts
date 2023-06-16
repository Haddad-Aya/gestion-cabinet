import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { medecin } from '../classes/medecin';
import { patient } from '../classes/patient';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  requestHeader = new HttpHeaders(
    { "No-Auth":"True"}
  )

  constructor(private http: HttpClient, private serviceToken:TokenService) { 
  }
  registerMedecin(medecin:medecin): Observable<any> {
    return this.http.post('http://localhost:8085/auth/registerMedecin',medecin)
  }
  registerPatient(patient:any): Observable<any> {
    return this.http.post('http://localhost:8085/auth/registerPatient',patient)
  }

  login(utilisateur:any): Observable<any> {
    return this.http.post('http://localhost:8085/auth/authenticate',utilisateur, {headers: this.requestHeader})
  }
/*
  getByMail(email:string): Observable<any> {
    return this.http.get('http://localhost:8085/auth/getMedecinByMail'+'/' +email)
  }
  newPatient(monPatient:patient): Observable<any> {
    return this.http.post('http://localhost:8085/auth/registerPatient',monPatient)
  }*/
  getMedecin(idMedecin: number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesPatients/getMedecin'+'/'+idMedecin)
  }
  getUserByEmail(email: string): Observable<any> {
    return this.http.get('http://localhost:8085/auth/getUserByMail' +'/'+ email)
  }
  updateMedecin(idMedecin:number, newMedecin:any): Observable<any> {
    return this.http.put('http://localhost:8085/api/admin/medecin/updateMedecin' +'/'+ idMedecin,newMedecin)
  }
  updateMdpUser(newUser:any): Observable<any> {
    return this.http.put('http://localhost:8085/auth/updateUser',newUser)
  }
  updateMdpMedecin(idMedecin:number, newMedecin:any): Observable<any> {
    return this.http.put('http://localhost:8085/api/admin/medecin/updateMdpMedecin' +'/'+ idMedecin,newMedecin)
  }
  sendMail(email: string): Observable<any> {
    return this.http.post('http://localhost:8085/auth/sendMail',email)
  }
  verifCode(codeMdp:number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('codeMdp', codeMdp);
    return this.http.get('http://localhost:8085/auth/verifCode',{params: queryParams })
  }
  roleMatch(allowedRoles:string):boolean{
    let isMatch = false
    const userRole: string =this.serviceToken.getRoles()
    if(userRole !== null && userRole){
          if(userRole === allowedRoles){
            isMatch=true
            console.log("1")
            return isMatch
          }
          else {
            console.log("2")
            console.log(isMatch)
            console.log(allowedRoles)
            console.log(userRole)
            return isMatch
          }
    }
    else {
      console.log("3")
      return isMatch
    }
  }
}
