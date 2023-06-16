import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultationService } from 'src/app/services/consultation.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  @ViewChild('confirmPassword', { static: false })
  confirmPassword!: ElementRef;
  vHeureS = [
    { "heure": "08:30" },
    { "heure": "09:00" },
    { "heure": "09:30" },
    { "heure": "10:00" },
    { "heure": "10:30" },
    { "heure": "11:00" },
    { "heure": "11:30" },
    { "heure": "12:00" },
    { "heure": "12:30" },
    { "heure": "15:00" },
    { "heure": "15:30" },
    { "heure": "16:00" },
    { "heure": "16:30" },
    { "heure": "17:00" },
    { "heure": "17:30" }
  ]
  vJour =[
    { "jour": "Lundi" },
    { "jour": "Mardi" },
    { "jour": "Mercredi" },
    { "jour": "Jeudi" },
    { "jour": "Vendredi" },
    { "jour": "Samedi" }
  ]
  form!: FormGroup
  coordonnee!:FormGroup
  mdpForm!:FormGroup
  adr!: string
  codePostal!: string
  nom!: string
  prenom!: string
  nCname!: number
  nomCabinet!:string
  specialite!:string
  nCin!: number
  email!: string
  telephone!: number
  civilite!:any
  sexe!:any
  token!:any
  idMedecin!:number
  medecin!:any
  horaires: any[] = []

  changement:boolean=false
  resultModification:boolean=false
  erreurModification:boolean=false
  verifJour:boolean=false
  verifDateDebutPremS:boolean=false
  verifDateFinPremS:boolean=false
  verifDateDebutDeuS:boolean=false
  verifDateFinDeuS:boolean=false
  valider:boolean=false
  erreur:boolean=false
  erreurJour:boolean=false
  modifValid:boolean=false
  verifMotDePasse: boolean = false
  verifConfirmPassword: boolean = false
  longMdp:boolean=false
  contenuMdp:boolean=false
  resultModificationMdp:boolean=false
  egal: boolean = false
  jour!:string

  verifMail: boolean = false
  verifNom: boolean = false
  verifPrenom: boolean = false
  verifChampsMail: boolean = false
  verifTelephone: boolean = false
  verifCodePostal: boolean = false
  verifAdr: boolean = false
  verifDateNaissance: boolean = false
  ngOnInit(): void {
    this.idMedecin=JSON.parse(localStorage.getItem("id")!) 
    this.profil()
    this.getListHoraire()
  
    this.coordonnee = new FormGroup({
      nom:new FormControl('', [Validators.required]),
      prenom:new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]),
      telephone:new FormControl('', [Validators.required]),
      adr:new FormControl('', [Validators.required]),
      codePostal:new FormControl('', [Validators.required]),
      ncin:new FormControl('', [Validators.required]),
      nomCabinet:new FormControl('', [Validators.required])
      
    })

    this.form = new FormGroup({
      id:new FormControl(''),
      jour:new FormControl('', [Validators.required]),
      dateDebutPremS:new FormControl('', [Validators.required]),
      dateFinPremS:new FormControl('', [Validators.required]),
      dateDebutDeuS:new FormControl('', [Validators.required]),
      dateFinDeuS:new FormControl('', [Validators.required])
    })
    this.mdpForm = new FormGroup({
      motDePasse:new FormControl('', [Validators.required])
    })
  }

  constructor( private build: FormBuilder, private serviceUtilisateur:UtilisateurService,private serviceConsultation:ConsultationService,private serviceToken:TokenService){}

  ajouter() {
   this.verifierLesChampModif()
   console.log(this.idMedecin)
   if(this.form.value.jour !="" && this.form.value.dateDebutPremS !="" && this.form.value.dateFinPremS !="" && this.verifierJour(this.form.value.jour) == false){
      this.serviceConsultation.saveHoraire(this.form.value,this.idMedecin).subscribe((resultData: any) => {
        this.valider=true
        this.erreurJour=false
        this.erreur=false
        this.horaires.push(resultData)
      });

   }
  else {
    this.erreur= true
    this.erreurJour= true
    this.valider=false
  }
  }
  getSelectedJour(event: any){
    let value = event.target.value;
    this.form.get('jour')?.setValue(value)
  }
  getSelectedHeureDebutPremS(event: any){
    let value = event.target.value;
    this.form.get('dateDebutPremS')?.setValue(value)
  }
  getSelectedHeureFinPremS(event: any){
    let value = event.target.value;
    this.form.get('dateFinPremS')?.setValue(value)
  }
  getSelectedHeureDebutDeuxS(event: any){
    let value = event.target.value;
    this.form.get('dateDebutDeuS')?.setValue(value)
  }
  getSelectedHeureFinDeuS(event: any){
    let value = event.target.value;
    this.form.get('dateFinDeuS')?.setValue(value)
  }
  verifierLesChampModif(){
    if(this.form.value.jour==""){
      this.verifJour=true
    }
    if(this.form.value.dateDebutPremS==""){
      this.verifDateDebutPremS=true
    }
    if(this.form.value.dateFinPremS==""){
      this.verifDateFinPremS=true
    } 
    if(this.form.value.dateDebutDeuS=="" && this.form.value.jour != "Samedi"){
      this.verifDateDebutDeuS=true
    }
    if(this.form.value.dateFinDeuS== "" && this.form.value.jour != "Samedi"){
      this.verifDateFinDeuS=true
    }
  }
  verifierLesChampModifCoordonne(){
    if(this.coordonnee.value.nom==""){
      this.verifNom=true
    }
    if(this.coordonnee.value.email==""){
      this.verifChampsMail=true
    }
    if(this.coordonnee.value.prenom==""){
      this.verifPrenom=true
    } 
    if(this.coordonnee.value.adr==""){
      this.verifAdr=true
    }
    if(this.coordonnee.value.codePostal== null ){
      this.verifCodePostal=true
    }
    if(this.coordonnee.value.dateNaissance==""){
      this.verifDateNaissance=true
    }
    if(this.coordonnee.value.telephone=="" ){
      this.verifTelephone=true
    }
  }
  profil(){
    this.idMedecin=JSON.parse(localStorage.getItem("id")!) 
    console.log("id medecin " +this.idMedecin)
    
       this.serviceUtilisateur.getMedecin(this.idMedecin).subscribe((resultData: any) => {
         this.medecin = resultData
         console.log(this.medecin)
         this.coordonnee.get('nom')?.setValue(this.medecin.nom)
         this.coordonnee.get('prenom')?.setValue(this.medecin.prenom)
         this.coordonnee.get('email')?.setValue(this.medecin.email)
         this.coordonnee.get('telephone')?.setValue(this.medecin.telephone)
         this.coordonnee.get('adr')?.setValue(this.medecin.adr)
         this.coordonnee.get('codePostal')?.setValue(this.medecin.codePostal)
         this.coordonnee.get('ncin')?.setValue(this.medecin.ncin)
         this.coordonnee.get('nomCabinet')?.setValue(this.medecin.nomCabinet)

       });
    
}
modification(h:any){
  this.jour=h.jour
  this.form.get('dateDebutPremS')?.setValue(h.dateDebutPremS)
  this.form.get('dateFinPremS')?.setValue(h.dateFinPremS)
  this.form.get('dateDebutDeuS')?.setValue(h.dateDebutDeuS)
  this.form.get('dateFinDeuS')?.setValue(h.dateFinDeuS)
}
modifier(){
  this.verifierLesChampModif()
   if(this.form.value.dateDebutPremS !="" && this.form.value.dateFinPremS !=""){
    this.serviceConsultation.updateHoraire(this.form.value.id,this.form.value).subscribe((resultData: any) => {
     });
   }
}
supprimerHoraire(idHoraire:number,horaire:any){
  try {
    this.serviceConsultation.deleteHoraire(idHoraire).subscribe((resultData: any) => {
     alert("Vous avez supprimer l'horaire de " + horaire.jour)
     this.horaires.splice(this.horaires.indexOf(horaire), 1);
    });
  }
  catch (error) {
    console.log(error)
  }
}
verifierJour(jour:string):boolean{
  try{
    this.serviceConsultation.getHoraireByJour(jour).subscribe((resultData: any) => {
      let res=resultData
      console.log(res)
      if(res == null)
      {
        console.log("bien")
        this.erreurJour=false
        return true
      }
      else {
        console.log("erreur")
        this.erreurJour=true
        return false
    }
     });
  }
  catch(error){
    console.log(error)
  /*  this.erreurJour=true
    return false*/
  }
  return false
}
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
changer(){
  this.changement=true
}
modifierProfil(){
  if(this.coordonnee.valid){
    this.serviceUtilisateur.updateMedecin(this.idMedecin,this.coordonnee.value).subscribe((resultData: any) => {
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
motDepassValidation(){
  if(this.mdpForm.value.motDePasse.length < 8){
    console.log(this.mdpForm.value.motDePasse.length)
      this.longMdp=true
  }
  if(this.mdpForm.value.motDePasse.indexOf(this.coordonnee.value.nom) != -1 || this.mdpForm.value.motDePasse.indexOf(this.coordonnee.value.prenom) != -1){
    console.log(this.form.value.motDePasse.length)
      this.contenuMdp=true
  }
}
modifierMdp(){
  if(this.mdpForm.value.motDePasse==""){
    this.verifMotDePasse=true
  }
  if(this.confirmPassword==null ){
    this.verifConfirmPassword=true
  }
  if(this.mdpForm.value.motDePasse === this.confirmPassword.nativeElement.value && this.confirmPassword.nativeElement.value !="" && this.mdpForm.valid){
    this.serviceUtilisateur.updateMdpMedecin(this.idMedecin,this.mdpForm.value).subscribe((resultData: any) => {
      if(resultData != null)
      this.resultModificationMdp=true
      this.serviceToken.clearToken()
    });
  }
  else if(this.mdpForm.value.motDePasse !== this.confirmPassword.nativeElement.value){
    this.egal=true
  }
}
}


