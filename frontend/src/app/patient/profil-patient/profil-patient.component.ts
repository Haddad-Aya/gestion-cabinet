import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultationService } from 'src/app/services/consultation.service';
import { PatientService } from 'src/app/services/patient.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-profil-patient',
  templateUrl: './profil-patient.component.html',
  styleUrls: ['./profil-patient.component.css']
})
export class ProfilPatientComponent implements OnInit {

  @ViewChild('confirmPassword', { static: false })
  confirmPassword!: ElementRef;
  mdpForm!:FormGroup
  coordonnee!:FormGroup
  idPatient!:number
  patient!:any
  verifMotDePasse: boolean = false
  verifConfirmPassword: boolean = false
  longMdp:boolean=false
  contenuMdp:boolean=false
  resultModificationMdp:boolean=false
  changement:boolean=false
  egal: boolean = false
  resultModification:boolean=false
  erreurModification:boolean=false
  civilite!:any
  sexe!:any
  ngOnInit(): void {
    this.idPatient=JSON.parse(localStorage.getItem("id")!) 
    this.profil()
    this.coordonnee = new FormGroup({
      nom:new FormControl('', [Validators.required]),
      prenom:new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]),
      telephone:new FormControl('', [Validators.required]),
      adr:new FormControl('', [Validators.required]),
      codePostal:new FormControl('', [Validators.required]),
      dateNaissance:new FormControl('', [Validators.required]),
      sexe:new FormControl('', [Validators.required]),
      civilite:new FormControl('', [Validators.required]),
      idCnam:new FormControl('', [Validators.required])
    })
    this.mdpForm = new FormGroup({
      motDePasse:new FormControl('', [Validators.required])
    })
  }
  constructor( private serviceUtilisateur:UtilisateurService,private build: FormBuilder, private servicePatient:PatientService,private serviceConsultation:ConsultationService,private serviceToken:TokenService){}

  motDepassValidation(){
    if(this.mdpForm.value.motDePasse.length < 8){
      console.log(this.mdpForm.value.motDePasse.length)
        this.longMdp=true
    }
    if(this.mdpForm.value.motDePasse.indexOf(this.coordonnee.value.nom) != -1 || this.mdpForm.value.motDePasse.indexOf(this.coordonnee.value.prenom) != -1){
      console.log(this.mdpForm.value.motDePasse.length)
        this.contenuMdp=true
    }
  }
  changer(){
    this.changement=true
  }
  modifierMdp(){
    if(this.mdpForm.value.motDePasse==""){
      this.verifMotDePasse=true
    }
    if(this.confirmPassword==null ){
      this.verifConfirmPassword=true
    }
    if(this.mdpForm.value.motDePasse === this.confirmPassword.nativeElement.value && this.confirmPassword.nativeElement.value !="" && this.mdpForm.valid){
      this.serviceUtilisateur.updateMdpPatient(this.idPatient,this.mdpForm.value).subscribe((resultData: any) => {
        if(resultData != null)
        this.resultModificationMdp=true
        this.serviceToken.clearToken()
      });
    }
    else if(this.mdpForm.value.motDePasse !== this.confirmPassword.nativeElement.value){
      this.egal=true
    }
  }
  profil(){
       this.servicePatient.getById(this.idPatient).subscribe((resultData: any) => {
         this.patient = resultData
         console.log(this.patient)
         this.coordonnee.get('nom')?.setValue(this.patient[0].nom)
         this.coordonnee.get('prenom')?.setValue(this.patient[0].prenom)
         this.coordonnee.get('email')?.setValue(this.patient[0].email)
         this.coordonnee.get('telephone')?.setValue(this.patient[0].telephone)
         this.coordonnee.get('adr')?.setValue(this.patient[0].adr)
         this.coordonnee.get('codePostal')?.setValue(this.patient[0].codePostal)
         this.coordonnee.get('dateNaissance')?.setValue(this.patient[0].dateNaissance)
         this.coordonnee.get('sexe')?.setValue(this.patient[0].sexe)
         this.coordonnee.get('civilite')?.setValue(this.patient[0].civilite)
         this.coordonnee.get('idCnam')?.setValue(this.patient[0].idCnam)
         this.civilite=this.patient[0].civilite
         console.log(this.civilite)
         this.sexe=this.patient[0].sexe
         console.log(this.sexe)
       });  
}
modifierProfil(){
  if(this.coordonnee.valid){
    this.servicePatient.modifierPatient(this.idPatient,this.coordonnee.value).subscribe((resultData: any) => {
      if(resultData != null)
      this.resultModification=true
      this.serviceToken.clearToken()
    });
    console.log(this.coordonnee.value.motDePasse)
  }
  else {
    console.log("erreur")
    this.erreurModification=true
  }
}
getSelectedSexe(event:any){
  let value = event.target.value;
  this.coordonnee.get('sexe')?.setValue(value)
}
getSelectedCivilite(event:any){
  let value = event.target.value;
  this.coordonnee.get('civilite')?.setValue(value)
}
}
