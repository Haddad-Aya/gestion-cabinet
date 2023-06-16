import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { consultation } from 'src/app/classes/consultation';
import { ConsultationService } from 'src/app/services/consultation.service';
import jspdf, { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { RendezVousService } from 'src/app/services/rendez-vous.service';

//to pdf


@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  vPaiment=[
    {"nom":"Gratuit","valeur":"GRATUIT"},
    {"nom":"Payé","valeur":"PAYE"},
    {"nom":"Non payé","valeur":"NON_PAYE"}
  ]
  vTypeConsultation=[
    {"nom":"Controle","valeur":"CONTROLE"},
    {"nom":"Visite","valeur":"VISITE"}
  ]
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
  affichTabTraitement=false
  affichTabFichier=false
  tabTraitement:any[] = []
  tabFichier:any[] = []
  verifOrdonance=false
  paiment!:string
  typeConsultation!:string
  traitements:any[] = []
  fichiers:any[] = [];
  formTraitement!: FormGroup
  formConsultation!: FormGroup
  formFichier!: FormGroup
  essaye!:any
  idRendezVous!:any
  ordonance:any[] = []
  medecin!:any
  adrMedecin!:string
  codePostalMedecin!:string
  emailMedecin!:string
  telMedecin!:number
  nomMedecin!:string
  prenomMedecin!:string
  dateAujourd!:Date
  patient!:any
  idCnamPatient!:number
  nomPatient!:string
  prenomPatient!:string

  //verifier champ consult
  verifEvolution:boolean=false
  verifDateConsultation:boolean=false
  verifTypeConsultation:boolean=false
  verifPaiment:boolean=false
  verifPrix:boolean=false
  //verif champs trait
  verifEffet:boolean=false
  verifNom:boolean=false
  verifNbrFoisParJour:boolean=false
  verifQuantite:boolean=false
  //verif champs fichier
  verifTitre:boolean=false
  verifNomFichier:boolean=false

  constructor(private serviceConsultation:ConsultationService, private serviceUtilisateur:UtilisateurService, private serviceRendezVous:RendezVousService, private build: FormBuilder,private router: Router,private activatedRoute: ActivatedRoute){
    this.idRendezVous = this.activatedRoute.snapshot.paramMap.get("id")
    console.log("id Rendez vous " + this.idRendezVous)
  }
  ngOnInit(): void {
    this.afficheTraitement()
    this.afficheFichier()
    try {
      this.serviceRendezVous.getPatientByIdRendezVous(this.idRendezVous).subscribe((resultData: any) => {
        this.patient=resultData
        console.log("mon patient" +this.patient)
        this.idCnamPatient=this.patient.idCnam
        this.nomPatient=this.patient.nom
        this.prenomPatient=this.patient.prenom
      });
    }
    catch (error) {
      console.log(error)
    }
    this.dateAujourd=new Date()
    let id=JSON.parse(localStorage.getItem("id")!) 
    let idMedecin=id
     try {
       this.serviceUtilisateur.getMedecin(idMedecin).subscribe((resultData: any) => {
         this.medecin = resultData
         this.adrMedecin=this.medecin.adr
         this.codePostalMedecin=this.medecin.codePostal
         this.emailMedecin=this.medecin.email
         this.telMedecin=this.medecin.telephone
         this.nomMedecin=this.medecin.nom
         this.prenomMedecin=this.medecin.prenom
        });
      }
      catch (error) {
        console.log(error)
      }
 //  let time_str = '13::55::26'
//  let time_object = toDate(time_str, '%H::%M::%S').time()
    //console.log(type(time_object))
  //  console.log(time_object)

 /* let now = new Date()
  now.setHours(15)
  now.setMinutes(0);
  now.setSeconds(0);
  console.log(now)*/
    //init formulaire consultation
    this.formConsultation = this.build.group({
      evolution:['', [Validators.required]],
      dateConsultation:['', [Validators.required]],
      heureConsultation:['', [Validators.required]],
      paiment:['', [Validators.required]],
      prix:['', [Validators.required]],
      typeConsultation:['', [Validators.required]]
    })

    //init formulaire traitement
    this.formTraitement = this.build.group({
      nom:['', [Validators.required]],
      quantite:['', [Validators.required]],
      effet:['', [Validators.required]],
      nbrFoisParJour:['', [Validators.required]]
    })

    //init formulaire fichier
    this.formFichier = this.build.group({
      titre:['', [Validators.required]],
      nom:['', [Validators.required]]
    })

  }
  getSelectedHeureDebut(event: any) {
    let value = event.target.value;
    console.log(value)
    this.formConsultation.get('heureConsultation')?.setValue(value)
  }
  addNewTraitements(){
    this.verifierLesChampTrait()
    if(this.formTraitement.valid)
   { 
    this.traitements.push(this.formTraitement.value);
    localStorage.setItem("traitements", JSON.stringify(this.traitements))
    console.log(this.traitements)
    this.verifOrdonance=true
    this.afficheTraitement()
   }
  }
  addNewFichiers(){
    this.verifierLesChampFile()
    if(this.formFichier.valid)
    {
      this.fichiers.push(this.formFichier.value);
       localStorage.setItem("fichiers", JSON.stringify(this.fichiers))
     this.afficheFichier()
    }
  }

  getSelectedPaiment(event:any){
    let value = event.target.value;
    console.log(value)
    this.formConsultation.get('paiment')?.setValue(value)
  }
  getSelectedTypeConsultation(event:any){
    let value = event.target.value;
    console.log(value)
    this.formConsultation.get('typeConsultation')?.setValue(value)
  }
  verifierLesChampConsul(){
    if(this.formConsultation.value.evolution==""){
      this.verifEvolution=true
    }
    if(this.formConsultation.value.dateConsultation==""){
      this.verifDateConsultation=true
    }
    if(this.formConsultation.value.heureConsultation==""){
      this.verifDateConsultation=true
    }
    if(this.formConsultation.value.typeConsultation==""){
      this.verifTypeConsultation=true
    } 
    if(this.formConsultation.value.paiment==""){
      this.verifPaiment=true
    }
    if(this.formConsultation.value.paiment=="PAYE" && this.formConsultation.value.prix == 0.0 ){
      this.verifPrix=true
    }
    if(this.formConsultation.value.paiment=="NON_PAYE" && this.formConsultation.value.prix == 0.0 ){
      this.verifPrix=true
    }
  }

  verifierLesChampTrait(){
    if(this.formTraitement.value.nbrFoisParJour==""){
      this.verifNbrFoisParJour=true
    }
    if(this.formTraitement.value.nom==""){
      this.verifNom=true
    }
    if(this.formTraitement.value.quantite==""){
      this.verifQuantite=true
    }
    if(this.formTraitement.value.effet==""){
      this.verifEffet=true
    }
  }

  verifierLesChampFile(){
    if(this.formFichier.value.nom==""){
      this.verifNomFichier=true
    }
    if(this.formFichier.value.titre==""){
      this.verifTitre=true
    }
  }

  addConsultation(){
    this.verifierLesChampConsul()
    if(this.formConsultation.valid){
    let mesTraitements=JSON.parse(localStorage.getItem("traitements")!)
    let mesFichiers=JSON.parse(localStorage.getItem("fichiers")!)
    let maConsultation=new consultation()
    maConsultation.evolution=this.formConsultation.value.evolution
    maConsultation.dateConsultation=this.formConsultation.value.dateConsultation
    maConsultation.heureConsultation=this.formConsultation.value.heureConsultation
    maConsultation.paiment=this.formConsultation.value.paiment
    maConsultation.prix=this.formConsultation.value.prix
    maConsultation.typeConsultation=this.formConsultation.value.typeConsultation
    maConsultation.traitements=mesTraitements
    maConsultation.fichiers=mesFichiers
    try {
      this.serviceConsultation.saveConsultation(maConsultation,this.idRendezVous).subscribe((resultData: any) => {
      });
    }
    catch (error) {
      console.log(error)
    }
   localStorage.removeItem("fichiers")
   localStorage.removeItem("traitements")
    console.log(maConsultation)
    console.log(this.formConsultation.value.typeConsultation)
    console.log(this.formConsultation.value.paiment)
  }
  }
  afficheTraitement(){
    this.tabTraitement=JSON.parse(localStorage.getItem("traitements")!)
    if ("traitements" in localStorage){
      this.verifOrdonance=true
      this.affichTabTraitement=true
    }
  }
  afficheFichier(){
    this.tabFichier=JSON.parse(localStorage.getItem("fichiers")!)
    if ("fichiers" in localStorage){
      this.affichTabFichier=true
  
    }
  }
  supprimerTraitement(i:number){
    this.traitements.splice(i, 1)
    if(this.traitements.length == 0){
      localStorage.removeItem("traitements")
      this.affichTabTraitement=false
      this.verifOrdonance=false
    }
   else localStorage.setItem("traitements", JSON.stringify(this.traitements))
   this.afficheTraitement()
   
  }
  supprimerFichier(i:number){
    this.fichiers.splice(i, 1)
    if(this.fichiers.length == 0){
      localStorage.removeItem("fichiers")
      this.affichTabFichier=false
    }
   else localStorage.setItem("fichiers", JSON.stringify(this.fichiers))
   this.afficheFichier()
  }
  getPatient(){
    try {
      this.serviceRendezVous.getPatientByIdRendezVous(this.idRendezVous).subscribe((resultData: any) => {
        this.patient=resultData
        console.log(this.patient)
        this.idCnamPatient=this.patient.idCnam
        this.nomPatient=this.patient.nom
        this.prenomPatient=this.patient.prenom
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  //fn to pdf
  public downloadAsPDF() {
    const content = document.getElementById('pdfOrdonance');

    if (!content) {
      console.error('Element not found!');
      return;
    }

    html2canvas(content, { scale: 3 }).then((canvas) => {
      const paddingTop = 50;
      const paddingRight = 50;
      const paddingBottom = 50;
      const paddingLeft = 50;

      const canvasWidth = canvas.width + paddingLeft + paddingRight;
      const canvasHeight = canvas.height + paddingTop + paddingBottom;

      const newCanvas = document.createElement('canvas');
      newCanvas.width = canvasWidth;
      newCanvas.height = canvasHeight;
      const ctx = newCanvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#ffffff'; // Background color
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(canvas, paddingLeft, paddingTop);
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = newCanvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('ordonance.pdf');
    });
     
  }
}


