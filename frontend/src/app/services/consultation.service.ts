import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) { }

  saveConsultation(maConsultation:any,idRendezVous:number): Observable<any> {
    return this.http.post('http://localhost:8085/api/admin/mesConsultations/newConsultation'+'/'+idRendezVous,maConsultation)
  }
  getHistoriquePatient(idPatient:number): Observable<any>{
    return this.http.get('http://localhost:8085/api/admin/mesConsultations/listConsultationsByPatient'+'/'+idPatient)
  }
  getListHoraire(): Observable<any>{
    return this.http.get('http://localhost:8085/api/admin/medecin/listHoraires')
  }
  getHoraireByJour(jour:string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('jour', jour);
    return this.http.get('http://localhost:8085/api/admin/medecin/getHoraireByJour',{ params: queryParams })
  }
  saveHoraire(horaire:any,idMedecin:number): Observable<any> {
    return this.http.post('http://localhost:8085/api/admin/medecin/newHoraire'+'/'+idMedecin,horaire)
  }
  deleteHoraire(idHoraire:number): Observable<any> {
    return this.http.delete('http://localhost:8085/api/admin/medecin/deleteHoraire'+'/'+idHoraire)
  }
  updateHoraire(idHoraire:number, newHoraire:any): Observable<any>{
    return this.http.put('http://localhost:8085/api/admin/medecin/updateHoraire'+"/"+ idHoraire,newHoraire)
  }
  getListConsultation(): Observable<any>{
    return this.http.get('http://localhost:8085/api/admin/mesConsultations/listConsultations')
  }
  getListConsultationPaye(): Observable<any>{
    return this.http.get('http://localhost:8085/api/admin/mesConsultations/listConsultationsPaye')
  }
  getListConsultationNonPaye(): Observable<any>{
    return this.http.get('http://localhost:8085/api/admin/mesConsultations/listConsultationsNonPaye')
  }
  getListConsultationGratuit(): Observable<any>{
    return this.http.get('http://localhost:8085/api/admin/mesConsultations/listConsultationsGratuit')
  }
  getListConsultationByNomPatient(nom:string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('nom', nom);
    return this.http.get('http://localhost:8085/api/admin/mesConsultations/listConsultationsByNomPatient',{ params: queryParams })
  }
  getListConsultationById(idConsultation:number): Observable<any>{
    return this.http.get('http://localhost:8085/api/admin/mesConsultations/getConsultationById'+"/"+ idConsultation)
  }
  updateConsultation(idConsultation:number, newConsultation:any): Observable<any>{
    return this.http.put('http://localhost:8085/api/admin/mesConsultations/updateConsultation'+"/"+ idConsultation,newConsultation)
  }
  deleteConsultation(idConsultation:number): Observable<any>{
    return this.http.delete('http://localhost:8085/api/admin/mesConsultations/deleteConsultation'+"/"+ idConsultation)
  }
}

