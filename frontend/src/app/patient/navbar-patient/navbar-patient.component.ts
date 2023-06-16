import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-navbar-patient',
  templateUrl: './navbar-patient.component.html',
  styleUrls: ['./navbar-patient.component.css']
})
export class NavbarPatientComponent  implements OnInit {
  verif!:any
  nomEtPrenom!: string
  patient!:any
  ngOnInit(): void {

    this.verif=JSON.parse(localStorage.getItem("id")!) 
    let idPatient=this.verif
    console.log(idPatient)
     try {
      console.log(idPatient)
       this.serviceUtilisateur.getById(idPatient).subscribe((resultData: any) => {
         this.patient = resultData
         console.log(this.patient)
         this.nomEtPrenom=this.patient[0].nom +' '+ this.patient[0].prenom
       });
     }
     catch (error) {
       console.log(error)
     }
  }
  constructor(private serviceUtilisateur:PatientService){}
}
