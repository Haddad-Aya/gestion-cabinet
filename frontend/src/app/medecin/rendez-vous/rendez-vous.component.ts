import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RendezVous } from 'src/app/classes/RendezVous';
import { PatientService } from 'src/app/services/patient.service';
import { RendezVousService } from 'src/app/services/rendez-vous.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {
  formRendezVous!: FormGroup
  idPatient!: any
  patients!: any
  resultaRendezVous: any
  vDateDebut = [
    { "heureD": "08:30" },
    { "heureD": "09:00" },
    { "heureD": "09:30" },
    { "heureD": "10:00" },
    { "heureD": "10:30" },
    { "heureD": "11:00" },
    { "heureD": "11:30" },
    { "heureD": "12:00" },
    { "heureD": "12:30" },
    { "heureD": "15:00" },
    { "heureD": "15:30" },
    { "heureD": "16:00" },
    { "heureD": "16:30" },
    { "heureD": "17:00" },
    { "heureD": "17:30" }
  ]
  //verif champs rendez vous
  verifHeureDebut: boolean = false
  verifDateRendezVous: boolean = false
  erreurFormulaire: boolean = false
  formulaireValid: boolean = false
  verifDisponibilite: boolean = false
  rendezVousModifier: boolean = false
  verifPatient: boolean = false
  dateNonDispo: boolean = false
  listPatient: any[] = []
  rendezVous: any[] = []
  nameShearch!: any
  idPatientC!: any
  enAttente: boolean = false
  constructor(private servicePatient: PatientService, private serviceRendezVous: RendezVousService, private router: Router, private build: FormBuilder) { }
  ngOnInit(): void {
    //init formulaire rendezVous
    this.formRendezVous = new FormGroup({
      id: new FormControl(''),
      dateRendezVous: new FormControl('', [Validators.required]),
      heureDebut: new FormControl('', [Validators.required])
    })
    try {
      this.serviceRendezVous.getAllRendezVous().subscribe((resultData: any) => {
        this.rendezVous = resultData
        console.log("mes rendezVous" + this.rendezVous)
        this.enAttente = false
      });
    }
    catch (error) {
      console.log(error)
    }
    try{
      this.servicePatient.getPatientsNonArchiver().subscribe((resultData: any) => {
        this.listPatient=resultData
      })
          }
          catch(error){
            console.log(error)
          }
  }

  getRendezVousAnnuler() {
    try {
      this.serviceRendezVous.getRendezVousAnnuler().subscribe((resultData: any) => {
        this.rendezVous = resultData
        console.log("mes rendezVous" + this.rendezVous)
        this.enAttente = false
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  getRendezVousRealiser() {
    try {
      this.serviceRendezVous.getRendezVousRealiser().subscribe((resultData: any) => {
        this.rendezVous = resultData
        console.log("mes rendezVous" + this.rendezVous)
        this.enAttente = false
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  getRendezVousEnAttente() {
    try {
      this.serviceRendezVous.getRendezVousEnAttente().subscribe((resultData: any) => {
        this.rendezVous = resultData
        this.enAttente = true
        console.log("mes rendezVous" + this.rendezVous)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  chercher() {
    console.log(typeof (this.nameShearch))
    this.serviceRendezVous.getRendezVousByNomPatient(this.nameShearch).subscribe((result: any) => {
      this.rendezVous = result
      console.log(this.rendezVous)
    });

  }
  refresh() {
    try {
      this.serviceRendezVous.getAllRendezVous().subscribe((resultData: any) => {
        this.rendezVous = resultData
        console.log("mes patients" + this.rendezVous)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  annulerRendezVous(idRendezVous: number, newRendezVous: any) {
    try {
      this.serviceRendezVous.annulerRendezVous(idRendezVous, newRendezVous).subscribe((resultData: any) => {
        alert('Vous avez annuler le rendez vous de ' + newRendezVous.patient.nom)
        this.rendezVous.splice(this.rendezVous.indexOf(newRendezVous), 1);
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  verifierLesChampRendezVous() {
    if (this.formRendezVous.value.dateRendezVous == "") {
      this.verifDateRendezVous = true
    }
    if (this.formRendezVous.value.heureDebut == "") {
      this.verifHeureDebut = true
    }
  }
  getSelectedHeureDebut(event: any) {
    let value = event.target.value;
    console.log(value)
    this.formRendezVous.get('heureDebut')?.setValue(value)
  }
  modification(rendezVous: any) {
    this.formRendezVous.get('id')?.setValue(rendezVous.id)
    this.formRendezVous.get('dateRendezVous')?.setValue(rendezVous.dateRendezVous)
    this.formRendezVous.get('heureDebut')?.setValue(rendezVous.heureDebut)
    console.log(rendezVous.heureDebut)
  }
  modifier() {
    this.verifierLesChampRendezVous()
    if (this.formRendezVous.valid) {
      console.log(this.formRendezVous.value)
      this.serviceRendezVous.getDisponibilteRendezVous(this.formRendezVous.value.dateRendezVous, this.formRendezVous.value.heureDebut).subscribe((resultData: any) => {
        this.resultaRendezVous = resultData;
      });
      /*if (this.resultaRendezVous != null) {
        this.verifDisponibilite = true
      }
      else{*/
        const newRendezVous=this.formRendezVous.value
        let idRendezVous=newRendezVous.id
        try {
          this.serviceRendezVous.updateRendezVous(idRendezVous,newRendezVous).subscribe((resultData: any) => {
            this.rendezVous.push(resultData)
            this.formRendezVous.reset
            this.verifDisponibilite = false
            this.rendezVousModifier =true
          });
        }
        catch(error){
          console.log(error)
        }

      //}
    }
  }
  getSelectedPatient(event:any){
    let value = event.target.value;
    console.log(value)
    this.idPatientC=value
    console.log(this.idPatientC)
  }
  ajouterRendezVous(){
    if(this.idPatientC==null){
      this.verifPatient=true
    }
    if(this.formRendezVous.value.dateRendezVous==""){
      this.verifDateRendezVous=true
    }
    if(this.formRendezVous.value.heureDebut==""){
      this.verifHeureDebut=true
    }
    if(this.formRendezVous.valid){
      let newRendezVous=new RendezVous()
      newRendezVous.dateRendezVous=this.formRendezVous.value.dateRendezVous
      newRendezVous.heureDebut=this.formRendezVous.value.heureDebut
      try {
        this.serviceRendezVous.saveRendezVous(newRendezVous,this.idPatientC).subscribe((resultData: any) => {
          if(resultData==null){
            this.dateNonDispo=true
          }
          else
          this.formulaireValid=true
        });
      }
      catch (error) {
        console.log(error)
      }
    }
    else this.erreurFormulaire=true
    }

}
