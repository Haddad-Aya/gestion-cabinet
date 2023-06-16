import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { RendezVousService } from 'src/app/services/rendez-vous.service';

@Component({
  selector: 'app-rendez-vous-patient',
  templateUrl: './rendez-vous-patient.component.html',
  styleUrls: ['./rendez-vous-patient.component.css']
})
export class RendezVousPatientComponent implements OnInit {
  formRendezVous!: FormGroup
  idPatient!: number
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
  rendezVous: any[] = []
  enAttente: boolean = false
  dateShearch!:any
  constructor(private servicePatient: PatientService, private serviceRendezVous: RendezVousService, private router: Router, private build: FormBuilder) { }
  ngOnInit(): void {
    this.idPatient = JSON.parse(localStorage.getItem("id")!) 
    //init formulaire rendezVous
    this.formRendezVous = new FormGroup({
      id: new FormControl(''),
      dateRendezVous: new FormControl('', [Validators.required]),
      heureDebut: new FormControl('', [Validators.required])
    })
    try {
      this.serviceRendezVous.getListRendezVousByIdPatient(this.idPatient).subscribe((resultData: any) => {
        this.rendezVous = resultData
        console.log("mes rendezVous" + this.rendezVous)
        this.enAttente = false
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  getRendezVousAnnuler() {
    try {
      this.serviceRendezVous.getRendezVousAnnulerByIdPatient(this.idPatient).subscribe((resultData: any) => {
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
      this.serviceRendezVous.getRendezVousRealiserByIdPatient(this.idPatient).subscribe((resultData: any) => {
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
      this.serviceRendezVous.getRendezVousEnAttenteByIdPatient(this.idPatient).subscribe((resultData: any) => {
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
    console.log(typeof (this.dateShearch))
    console.log(this.dateShearch)
    this.serviceRendezVous.listRendezVousByDateAndIdPatient(this.idPatient,this.dateShearch).subscribe((result: any) => {
      this.rendezVous = result
      console.log(this.rendezVous)
    });

  }
  refresh() {
    try {
      this.serviceRendezVous.getListRendezVousByIdPatient(this.idPatient).subscribe((resultData: any) => {
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
        alert('Vous avez annuler le rendez vous de la date ' + newRendezVous.dateRendezVous)
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
}
