import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { StatistiqueService } from 'src/app/services/statistique.service';
import { ChartConfiguration } from 'chart.js';

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

  nbrConsultationPaye!:number
  nbrConsultationNonPaye!:number
  nbrConsultationGratuit!:number

  nbrTotalPatient!:number
  nbrFemme!:number
  nbrHomme!:number

  nbrRendezVousRealiser!:number
  nbrRendezVousAnnuler!:number
   // Doughnut
   public doughnutChartLabels: string[] = [ 'Rémunération des visites', 'Les dépenses' ];
   public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
       { data: [ 10000, 3000 ], label: 'Series A' }
     ];
 
   public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
     responsive: false
   };
  ngOnInit(): void {
   this.getNbrConsultationPaye()
   this.getNbrConsultationNonPaye()
   this.getNbrConsultationGratuit()

   this.getNbrTotalPatient()
   this.getNbrHomme()
   this.getNbrFemme()

   this.getNbrRendezVousAnnuler()
   this.getNbrRendezVousRealiser()

   this.getBenificeNet()
   this.getSommeConsultation()
   this.getSommeFacture()
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
//statistique les consultation
  getNbrConsultationPaye(){
    try {
      this.serviceStatistique.getNbrConsultationPaye().subscribe((resultData: any) => {
        this.nbrConsultationPaye=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }
  getNbrConsultationNonPaye(){
    try {
      this.serviceStatistique.getNbrConsultationNonPaye().subscribe((resultData: any) => {
        this.nbrConsultationNonPaye=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }
  getNbrConsultationGratuit(){
    try {
      this.serviceStatistique.getNbrConsultationGratuit().subscribe((resultData: any) => {
        this.nbrConsultationGratuit=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }

  //statistique des patient
  getNbrFemme(){
    try {
      this.serviceStatistique.getNbrFemme().subscribe((resultData: any) => {
        this.nbrFemme=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }
  getNbrTotalPatient(){
    try {
      this.serviceStatistique.getNbrTotalPatient().subscribe((resultData: any) => {
        this.nbrTotalPatient=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }
  getNbrHomme(){
    try {
      this.serviceStatistique.getNbrHomme().subscribe((resultData: any) => {
        this.nbrHomme=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }

  getNbrRendezVousAnnuler(){
    try {
      this.serviceStatistique.getNbrRendezVousAnnuler().subscribe((resultData: any) => {
        this.nbrRendezVousAnnuler=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }
  getNbrRendezVousRealiser(){
    try {
      this.serviceStatistique.getNbrRendezVousRealiser().subscribe((resultData: any) => {
        this.nbrRendezVousRealiser=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }

  getBenificeNet(){
    try {
      this.serviceStatistique.getBenificeNet().subscribe((resultData: any) => {
        this.beneficeNet=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }

  getSommeFacture(){
    try {
      this.serviceStatistique.getSommeFacture().subscribe((resultData: any) => {
        this.sommeFacture=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }
  getSommeConsultation(){
    try {
      this.serviceStatistique.getSommeConsultation().subscribe((resultData: any) => {
        this.sommeConsultation=resultData;
      });
    }
    catch (error) {
      console.log(error)
  }
  }
}
