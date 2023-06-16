import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http: HttpClient) { }

  getPatientByIdRendezVous(idRendezVous:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/getPatientByIdRendezVous'+"/"+idRendezVous)
  }
  getListRendezVousByIdPatient(idPatient:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousByIdPatient'+"/"+idPatient)
  }
  getRendezVousAnnulerByIdPatient(idPatient:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousAnnulerByIdPatient'+"/"+idPatient)
  }
  getRendezVousRealiserByIdPatient(idPatient:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousRealiserByIdPatient'+"/"+idPatient)
  }
  getRendezVousEnAttenteByIdPatient(idPatient:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousEnAttenteByIdPatient'+"/"+idPatient)
  }
  listRendezVousByDateAndIdPatient(idPatient:number,dateRendezVous:string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('dateRendezVous', dateRendezVous);
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousByDateAndIdPatient'+"/"+idPatient,{ params: queryParams })
  }
  saveRendezVous(rendezVous:any,idPatient:number): Observable<any>{
    return this.http.post('http://localhost:8085/api/admin/mesRendezVous/newRendezVous'+"/"+idPatient,rendezVous)
  }
  getAllRendezVous(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVous')
  }
  getRendezVousAnnuler(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousAnnuler')
  }
  getRendezVousRealiser(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousRealiser')
  }
  getRendezVousEnAttente(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousEnAttente')
  }
  getRendezVousByNomPatient(nom:string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('nom', nom);
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousByNomPatient',{ params: queryParams })
  }
  getRendezVousNonAnnuler(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/listRendezVousNonAnnuler')
  }
  annulerRendezVous(idRendezVous:number,newRendezVous:any): Observable<any> {
    return this.http.put('http://localhost:8085/api/admin/mesRendezVous/annulerRendezVous'+'/'+idRendezVous,newRendezVous)
  }
  updateRendezVous(idRendezVous:number,newRendezVous:any): Observable<any> {
    return this.http.put('http://localhost:8085/api/admin/mesRendezVous/updateRendezVous'+'/'+idRendezVous,newRendezVous)
  }
  getDisponibilteRendezVous(dateRendezVous:string, heureDebut:string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('heureDebut', heureDebut);
    queryParams = queryParams.append('dateRendezVous', dateRendezVous);
    return this.http.get('http://localhost:8085/api/admin/mesRendezVous/disponibiliterRendezVous',{ params: queryParams })
  }
}
