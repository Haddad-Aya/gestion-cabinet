import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {formatDate} from '@angular/common';
import { StatistiqueService } from 'src/app/services/statistique.service';
import { patient } from 'src/app/classes/patient';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  verif!:any
  sommeFacture!:any
  sommeConsultation!:any
  nbrVisite!:any
  beneficeNet!:any
  @ViewChild('confirmPassword', { static: false })
  confirmPassword!: ElementRef;
  valider: boolean = false
  remplir: boolean = false
  egal: boolean = false
  verifMail: boolean = false

  form!: FormGroup
  nom!: string
  prenom!: string
  email!: string
  telephone!: number
  codePostal!: number
  dateNaissance!: Date
  civilite!:any
  sexe!:any
  CNSS!:number
  adresse!:string
  motDePasse!: string
  vMotDePasse!: string
  medecin!:any
  ngOnInit(): void {

    this.verif=JSON.parse(localStorage.getItem("token")!) 
   let idMedecin=this.verif.id
   //console.log(idMedecin)
  /*  try {
      this.serviceUtilisateur.getMedecin(idMedecin).subscribe((resultData: any) => {
        this.medecin = resultData
        this.nom=resultData.nom
        this.prenom=resultData.prenom
        console.log(this.medecin)
      });
    }
    catch (error) {
      console.log(error)
    }*/
  //  this.getStatistiqueDeJour()
  }
  constructor(private serviceStatistique:StatistiqueService,private serviceUtilisateur:UtilisateurService,private router: Router){}

 /* getStatistiqueDeJour() {
 //  var dateJour=formatDate(new Date(), 'yyyy/MM/dd', 'en');
 let idUtilisateur=this.verif.id
 console.log(idUtilisateur)
  let dateJour=new Date()
   console.log(dateJour) 
   var fecha = new Date();
   console.log("As ISO8601 in utc:", fecha);
   console.log("As local:", fecha.toLocaleString());
   try {
    this.serviceStatistique.getSommeFacture(fecha,idUtilisateur).subscribe((resultData: any) => {
      this.sommeFacture=resultData;
    });
  }
  catch (error) {
    console.log(error)
  }

  try {
    this.serviceStatistique.getSommeConsultation(fecha,idUtilisateur).subscribe((resultData: any) => {
      this.sommeConsultation=resultData;
    });
  }
  catch (error) {
    console.log(error)
  }

  try {
    this.serviceStatistique.getBeneficeNet(fecha,idUtilisateur).subscribe((resultData: any) => {
      this.beneficeNet=resultData;
    });
  }
  catch (error) {
    console.log(error)
  }

  try {
    this.serviceStatistique.getNbrConsultation(fecha,idUtilisateur).subscribe((resultData: any) => {
      this.nbrVisite=resultData;
    });
  }
  catch (error) {
    console.log(error)
  }

  }*/

 /* getSelectedCivilite(event: any){
    let civilite = event.target.value;
    //console.log(this.civilite)
    this.form.get('civilite')?.setValue(civilite)
  }

  getSelectedSexe(event: any){
    let sexe = event.target.value;
   // console.log(this.sexe)
   this.form.get('sexe')?.setValue(sexe)
  }

  ajouter(){
   // if ( this.form.value.motDePasse === this.confirmPassword.nativeElement.value) {
  /*    var user = new patient
          user.nom = this.form.value.nom,
          user.prenom = this.form.value.prenom,
          user.email = this.form.value.email,
          user.telephone = this.form.value.telephone,
          user.adr = this.form.value.adresse,
          user.civilite=this.form.value.civilite,
          user.cnss=this.form.value.CNSS,
          user.dateNaissance=this.form.value.dateNaissance,
          user.motDePasse=this.form.value.motDePasse,
          user.sexe=this.form.value.sexe,
          user.codePostal=this.form.value.codePostal
console.log(this.civilite)
console.log(user.sexe)
console.log(user.cnss)*/
  /*        this.serviceUtilisateur.newPatient(this.form.value).subscribe((result: any) => {
            console.log(result);
            this.valider = true
            this.egal = false
            this.valider = false
            this.verifMail = false
          })
   // }
  }*/

}
