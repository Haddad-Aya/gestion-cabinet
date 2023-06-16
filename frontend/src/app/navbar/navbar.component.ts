import { Component,OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  verif!:any
  nomEtPrenom!: string
  medecin!:any
  ngOnInit(): void {

    this.verif=JSON.parse(localStorage.getItem("id")!) 
    let idMedecin=this.verif
    console.log(idMedecin)
     try {
      console.log(idMedecin)
       this.serviceUtilisateur.getMedecin(idMedecin).subscribe((resultData: any) => {
         this.medecin = resultData
         console.log(this.medecin)
         this.nomEtPrenom=this.medecin.nom +' '+ this.medecin.prenom
       });
     }
     catch (error) {
       console.log(error)
     }
  }
  constructor(private serviceUtilisateur:UtilisateurService){}
}
