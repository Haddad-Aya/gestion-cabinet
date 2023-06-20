import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Mail } from '../classes/Mail';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  registerPatient(patient:any): Observable<any> {
    return this.http.post('http://localhost:8085/api/admin/mesPatients/registerPatient',patient)
  }

  getByEmail(email:string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    return this.http.get('http://localhost:8085/api/admin/mesPatients/patientByEmail',{ params: queryParams })
  }

  getByNom(nom:string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('nom', nom);
    return this.http.get('http://localhost:8085/api/admin/mesPatients/patientByNom',{ params: queryParams })
  }

  getByTelephone(telephone:number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('telephone', telephone);
    return this.http.get('http://localhost:8085/api/admin/mesPatients/patientByTelephone',{ params: queryParams })
  }

  getById(idPatient:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesPatients/patientById'+"/"+idPatient)
  }

  getPatientsNonArchiver(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesPatients/listPatients')
  }

  getPatientsArchiver(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/mesPatients/mesPatientsArchiver')
  }

  archiverPatient(idPatient:number,patient:any): Observable<any> {
    return this.http.put('http://localhost:8085/api/admin/mesPatients/archiverPatient'+"/"+idPatient,patient)
  }

  desArchiverPatient(idPatient:number,patient:any): Observable<any> {
    return this.http.put('http://localhost:8085/api/admin/mesPatients/desArchiverPatient'+"/"+idPatient,patient)
  }

  modifierPatient(idPatient:number,patient:any): Observable<any> {
    return this.http.put('http://localhost:8085/api/admin/mesPatients/updatePatient'+"/"+idPatient,patient)
  }
  sendListMail(mail:Mail): Observable<any> {
    return this.http.post('http://localhost:8085/api/admin/mesPatients/sendEmail',mail)
  }
}