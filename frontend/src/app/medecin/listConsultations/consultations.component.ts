import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { consultation } from 'src/app/classes/consultation';
import { ConsultationService } from 'src/app/services/consultation.service';
import { RendezVousService } from 'src/app/services/rendez-vous.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit{
  vPaiment=[
    {"nom":"Gratuit","valeur":"GRATUIT"},
    {"nom":"Payé","valeur":"PAYE"},
    {"nom":"Non payé","valeur":"NON_PAYE"}
  ]
  vTypeConsultation=[
    {"nom":"Controle","valeur":"CONTROLE"},
    {"nom":"Visite","valeur":"VISITE"}
  ]
  traitements:any[] = []
  fichiers:any[] = [];
  listRendezVous:any[]=[]
  formTraitement!: FormGroup
  formConsultation!: FormGroup
  formFichier!: FormGroup
  consultation: any[] = []
  affichTabTraitement=false
  affichTabFichier=false
  tabTraitement:any[] = []
  tabFichier:any[] = []
   //verifier champ consult
   verifEvolution:boolean=false
   verifDateConsultation:boolean=false
   verifTypeConsultation:boolean=false
   verifPaiment:boolean=false
   verifPrix:boolean=false
   verifRendezVous:boolean=false
   //verif champs trait
   verifEffet:boolean=false
   verifNom:boolean=false
   verifNbrFoisParJour:boolean=false
   verifQuantite:boolean=false
   //verif champs fichier
   verifTitre:boolean=false
   verifNomFichier:boolean=false

   nameShearch!:any
   consultationById!:any
   idRendezVous!:any
   verifOrdonance:boolean=false
   valider:boolean=false

   patient!:any
   idCnamPatient!:number
   nomPatient!:string
   prenomPatient!:string
   medecin!:any
   adrMedecin!:string
   codePostalMedecin!:string
   emailMedecin!:string
   telMedecin!:number
   nomMedecin!:string
   prenomMedecin!:string
   dateAujourd!:Date
  constructor(private serviceConsultation:ConsultationService, private serviceUtilisateur:UtilisateurService, private serviceRendezVous:RendezVousService, private build: FormBuilder,private router: Router,private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
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
    try{
      this.serviceConsultation.getListConsultation().subscribe((resultData: any) => {
        this.consultation=resultData
        console.log(this.consultation)
       });
    }
    catch(error){
      console.log(error)
    }
    this.afficheTraitement()
    this.afficheFichier()
    try{
this.serviceRendezVous.getRendezVousEnAttente().subscribe((resultData: any) => {
  this.listRendezVous=resultData
})
    }
    catch(error){
      console.log(error)
    }
    this.getListConsultation()
    //init formulaire consultation
    this.formConsultation = new FormGroup({
      evolution:new FormControl('', [Validators.required]),
      dateConsultation:new FormControl('', [Validators.required]),
      heureConsultation:new FormControl('', [Validators.required]),
      paiment:new FormControl('', [Validators.required]),
      prix:new FormControl('', [Validators.required]),
      typeConsultation:new FormControl('', [Validators.required])
    })

    //init formulaire traitement
    this.formTraitement = new FormGroup({
      nom:new FormControl('', [Validators.required]),
      quantite:new FormControl('', [Validators.required]),
      effet:new FormControl('', [Validators.required]),
      nbrFoisParJour:new FormControl('', [Validators.required])
    })

    //init formulaire fichier
    this.formFichier = new FormGroup({
      titre:new FormControl('', [Validators.required]),
      nom:new FormControl('', [Validators.required])
    })

  }
  getSelectedPaiment(event:any){
    let value = event.target.value;
    console.log(value)
    this.formConsultation.get('paiment')?.setValue(value)
  }
  getSelectedRendezVous(event:any){
    let value = event.target.value;
    console.log(value)
    this.idRendezVous=value
    console.log(this.idRendezVous)
  }
  getSelectedTypeConsultation(event:any){
    let value = event.target.value;
    console.log(value)
    this.formConsultation.get('typeConsultation')?.setValue(value)
  }
  verifierLesChampConsul(){
    if(this.idRendezVous==null){
      this.verifRendezVous=true
    }
    if(this.formConsultation.value.evolution==""){
      this.verifEvolution=true
    }
    if(this.formConsultation.value.dateConsultation==""){
      this.verifDateConsultation=true
    }
    if(this.formConsultation.value.typeConsultation==""){
      this.verifTypeConsultation=true
    } 
    if(this.formConsultation.value.paiment==""){
      this.verifPaiment=true
    }
    if(this.formConsultation.value.prix == 0.0 && (this.formConsultation.value.paiment=="PAYE" || this.formConsultation.value.paiment=="NON_PAYE")){
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
  addNewTraitements(){
    this.verifierLesChampTrait()
    if(this.formTraitement.valid)
   { 
    this.traitements.push(this.formTraitement.value);
    console.log(this.formTraitement);
    localStorage.setItem("traitements", JSON.stringify(this.traitements))
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
  getListConsultation(){
    try{
      this.serviceConsultation.getListConsultation().subscribe((resultData: any) => {
        this.consultation=resultData
        console.log(this.consultation)
       });
    }
    catch(error){
      console.log(error)
    }
  }
  chercher(){
    try{
      this.serviceConsultation.getListConsultationByNomPatient(this.nameShearch).subscribe((resultData: any) => {
        this.consultation=resultData
        console.log("consultation by nom" + this.consultation)
       });
    }
    catch(error){
      console.log(error)
    }
  }
  refresh(){
    try{
      this.serviceConsultation.getListConsultation().subscribe((resultData: any) => {
        this.consultation=resultData
        console.log(this.consultation)
       });
    }
    catch(error){
      console.log(error)
    }
  }
  getConsultationNonPaye(){
    try {
      this.serviceConsultation.getListConsultationNonPaye().subscribe((resultData: any) => {
       this.consultation=resultData
       console.log("mes consultation non paye"+this.consultation)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  ConsultationGratuit(){
    try {
      this.serviceConsultation.getListConsultationGratuit().subscribe((resultData: any) => {
       this.consultation=resultData
       console.log("mes consultation gratuit"+this.consultation)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  getConsultationPaye(){
    try {
      this.serviceConsultation.getListConsultationPaye().subscribe((resultData: any) => {
       this.consultation=resultData
       console.log("mes consultation paye"+this.consultation)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  getConsultationById(consultation:any){
       this.consultationById = consultation
  }
  modification(c:any){
    this.formConsultation.get('id')?.setValue(c.id)
    this.formConsultation.get('evolution')?.setValue(c.evolution)
    this.formConsultation.get('dateConsultation')?.setValue(c.dateConsultation),
    this.formConsultation.get('heureConsultation')?.setValue(c.heureConsultation)
    this.formConsultation.get('paiment')?.setValue(c.paiment)
    this.formConsultation.get('prix')?.setValue(c.prix)
    this.formConsultation.get('typeConsultation')?.setValue(c.typeConsultation)
  }
  deleteConsultation(idConsultation:number,consultation:any){
    try {
      this.serviceConsultation.deleteConsultation(idConsultation).subscribe((resultData: any) => {
        this.consultation.splice(this.consultation.indexOf(consultation), 1);
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  addConsultation(){
    this.verifierLesChampConsul()
    if(this.idRendezVous!=null && 
      this.formConsultation.value.evolution !="" &&
      this.formConsultation.value.dateConsultation !="" &&
      this.formConsultation.value.typeConsultation !="" &&
      this.formConsultation.value.paiment !="" &&
      ((this.formConsultation.value.prix == 0.0 && (this.formConsultation.value.paiment !="PAYE" || this.formConsultation.value.paiment !="NON_PAYE")) || (this.formConsultation.value.prix != 0.0 && (this.formConsultation.value.paiment !="GRATUIT")))
      ){
      console.log(this.idRendezVous)
      if(this.formConsultation.valid){
      let mesTraitements=JSON.parse(localStorage.getItem("traitements")!)
      let mesFichiers=JSON.parse(localStorage.getItem("fichiers")!)
      let maConsultation=new consultation()
      maConsultation.evolution=this.formConsultation.value.evolution
      maConsultation.dateConsultation=this.formConsultation.value.dateConsultation
      maConsultation.paiment=this.formConsultation.value.paiment
      maConsultation.prix=this.formConsultation.value.prix
      maConsultation.typeConsultation=this.formConsultation.value.typeConsultation
      maConsultation.traitements=mesTraitements
      maConsultation.fichiers=mesFichiers
      try {
        this.serviceConsultation.saveConsultation(maConsultation,this.idRendezVous).subscribe((resultData: any) => {
          this.valider=true
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
    
}

 //ordonance to pdf
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
