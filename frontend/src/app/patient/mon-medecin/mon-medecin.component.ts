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
  ngOnInit(): void {
    this.getListHoraire()
    try {
      this.serviceUtilisateur.getMedecin(31).subscribe((resultData: any) => {
        this.medecin = resultData
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

