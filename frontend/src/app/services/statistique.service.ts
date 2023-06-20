import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private http: HttpClient) { }

/*  getSommeFacture(date:Date, idMedecin:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/sommeFacturesJour'+'/'+idMedecin+'/'+date)
  }
  getSommeConsultation(date:Date, idMedecin:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/sommeConsultationsJour'+'/'+idMedecin+'/'+date)
  }
  getBeneficeNet(date:Date, idMedecin:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/beneficeNetJour'+'/'+idMedecin+'/'+date)
  }*/
  getNbrConsultation(date:Date, idMedecin:number): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrConsultation'+'/'+idMedecin+'/'+date)
  }
  getAllFacture(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/mesFactures')
  }
  saveFacture(facture: any, idMedecin:number): Observable<any> {
    return this.http.post('http://localhost:8085/api/admin/statistique/newFactures'+'/'+idMedecin,facture)
  }

  getNbrConsultationPaye(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrConsultationPaye')
  }
  getNbrConsultationNonPaye(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrConsultationNonPaye')
  }
  getNbrConsultationGratuit(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrConsultationGratuit')
  }

  getNbrTotalPatient(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrTotalPatient')
  }
  getNbrHomme(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrHomme')
  }
  getNbrFemme(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrFemme')
  }

  getNbrRendezVousAnnuler(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrRendezVousAnnuler')
  }
  getNbrRendezVousRealiser(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/nbrRendezVousRealiser')
  }

  getBenificeNet(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/beneficeNet')
  }
  getSommeFacture(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/sommeFacture')
  }
  getSommeConsultation(): Observable<any> {
    return this.http.get('http://localhost:8085/api/admin/statistique/sommeConsultation')
  }
}
