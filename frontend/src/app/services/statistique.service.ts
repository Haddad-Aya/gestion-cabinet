import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private http: HttpClient) { }

  getSommeFacture(date:Date, idMedecin:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/sommeFacturesJour'+'/'+idMedecin+'/'+date)
  }
  getSommeConsultation(date:Date, idMedecin:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/sommeConsultationsJour'+'/'+idMedecin+'/'+date)
  }
  getBeneficeNet(date:Date, idMedecin:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/beneficeNetJour'+'/'+idMedecin+'/'+date)
  }
  getNbrConsultation(date:Date, idMedecin:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrConsultation'+'/'+idMedecin+'/'+date)
  }
  getAllFacture(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/mesFactures')
  }
}
