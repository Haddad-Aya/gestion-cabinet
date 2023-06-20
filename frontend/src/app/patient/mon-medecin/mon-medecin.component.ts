import { Component, OnInit } from '@angular/core';
import { ConsultationService } from 'src/app/services/consultation.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-mon-medecin',
  templateUrl: './mon-medecin.component.html',
  styleUrls: ['./mon-medecin.component.css']
})
export class MonMedecinComponent implements OnInit{
  horaires: any[] = []
  medecin!:any
  nom!:string
  prenom!:string
  telephone!:number
  email!:string
  nomCabinet!:string
  ngOnInit(): void {
    this.getListHoraire()
    try {
      this.serviceUtilisateur.getMedecin(31).subscribe((resultData: any) => {
        this.medecin = resultData
        this.nom=this.medecin.nom
    this.prenom=this.medecin.prenom
    this.telephone=this.medecin.telephone
    this.email=this.medecin.email
    this.nomCabinet=this.medecin.nomCabinet

      });
    }
    catch (error) {
      console.log(error)
    }
  }
  constructor(private serviceConsultation:ConsultationService, private serviceUtilisateur:UtilisateurService){}
  getListHoraire(){
    try {
      this.serviceConsultation.getListHoraire().subscribe((resultData: any) => {
        this.horaires = resultData
      });
    }
    catch (error) {
      console.log(error)
    }
  }
}

