import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RendezVous } from 'src/app/classes/RendezVous';
import { PatientService } from 'src/app/services/patient.service';
import { RendezVousService } from 'src/app/services/rendez-vous.service';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  vDateDebut=[
    {"heureD":"08:30"},
    {"heureD":"09:00"},
    {"heureD":"09:30"},
    {"heureD":"10:00"},
    {"heureD":"10:30"},
    {"heureD":"11:00"},
    {"heureD":"11:30"},
    {"heureD":"12:00"},
    {"heureD":"12:30"},
    {"heureD":"15:00"},
    {"heureD":"15:30"},
    {"heureD":"16:00"},
    {"heureD":"16:30"},
    {"heureD":"17:00"},
    {"heureD":"17:30"}
  ]
  formRendezVous!: FormGroup
  verifHeureDebut:boolean=false
  verifDateRendezVous:boolean=false
  erreurFormulaire:boolean=false
  formulaireValid:boolean=false
  @ViewChild('confirmPassword', { static: false })
  confirmPassword!: ElementRef;
  local!:any
  telephoneShearch!:any
  patients: any[] = []
  form!: FormGroup
  formModif!: FormGroup
  nom!: string
  prenom!: string
  //email!: string
  telephone!: number
  codePostal!: number
  dateNaissance!: any
  civilite!:string
  sexe!:string
  idCnam!:bigint
  adr!:string
  motDePasse!:string
  //verification des champs
  valider: boolean = false
  remplir: boolean = false
  egal: boolean = false
  verifMail: boolean = false
  verifNom: boolean = false
  verifPrenom: boolean = false
  verifChampsMail: boolean = false
  verifTelephone: boolean = false
  verifCodePostal: boolean = false
  verifAdr: boolean = false
  verifMotDePasse: boolean = false
  verifConfirmPassword: boolean = false
  verifDateNaissance: boolean = false
  resultaEmail:any
  verifModifier:boolean=false
  longMdp:boolean=false
  contenuMdp:boolean=false
  email: any;
  idPatient!:number
  ngOnInit(): void {

    this.local=JSON.parse(localStorage.getItem("token")!) 
    try {
      this.servicePatient.getPatientsNonArchiver().subscribe((resultData: any) => {
       this.patients=resultData
      });
    }
    catch (error) {
      console.log(error)
    }
    this.archiverPatient
    this.getIdPatient
    this.form = new FormGroup({
      //id:new FormControl('', [Validators.required]),
      nom:new FormControl('', [Validators.required,Validators.minLength(3)]),
      prenom: new FormControl('', [Validators.required,Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      telephone: new FormControl('', [Validators.required]),
      adr: new FormControl('', [Validators.required]),
      codePostal: new FormControl("", [Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
      dateNaissance: new FormControl('', [Validators.required]),
      civilite: new FormControl('', []),
      sexe: new FormControl('', []),
      idCnam: new FormControl('', [Validators.minLength(10),Validators.maxLength(10)]),
      motDePasse: new FormControl('', [Validators.required,Validators.minLength(8)])
    })

    this.formModif= new FormGroup({
      id:new FormControl(''),
      nom:new FormControl('', [Validators.required,Validators.minLength(3)]),
      prenom: new FormControl('', [Validators.required,Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      telephone: new FormControl('', [Validators.required]),
      adr: new FormControl('', [Validators.required]),
      codePostal: new FormControl("", [Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
      dateNaissance: new FormControl('', [Validators.required]),
      civilite: new FormControl('', []),
      sexe: new FormControl('', []),
      idCnam: new FormControl('', [Validators.minLength(10),Validators.maxLength(10)])
    })
    //init formulaire rendezVous
    this.formRendezVous = this.build.group({
      dateRendezVous:['', [Validators.required]],
      heureDebut:['', [Validators.required]]
    })
  }
  constructor(private servicePatient:PatientService, private build: FormBuilder,private router: Router, private serviceRendezVous:RendezVousService){}

  archiverPatient(idPatient:number,patient:any){
    try {
      this.servicePatient.archiverPatient(idPatient,patient).subscribe((resultData: any) => {
        this.patients.splice(this.patients.indexOf(patient), 1);
       console.log(resultData)
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  modification(patient: any){
      this.formModif.get('id')?.setValue(patient.id)
      this.formModif.get('nom')?.setValue(patient.nom)
      this.formModif.get('prenom')?.setValue(patient.prenom)
      this.formModif.get('email')?.setValue(patient.email)
      this.formModif.get('telephone')?.setValue(patient.telephone)
      this.formModif.get('adr')?.setValue(patient.adr)
      this.formModif.get('codePostal')?.setValue(patient.codePostal)
      this.formModif.get('dateNaissance')?.setValue(patient.dateNaissance)
      this.formModif.get('civilite')?.setValue(patient.civilite)
      this.formModif.get('sexe')?.setValue(patient.sexe)
      this.formModif.get('idCnam')?.setValue(patient.idCnam)
      this.civilite=patient.civilite
      console.log(this.civilite)
      this.sexe=patient.sexe
      console.log(this.sexe)
  }
  modifier(){
    this.verifierLesChampModif()
    if(this.formModif.valid){
      this.servicePatient.getByEmail(this.formModif.value.email).subscribe((result: any) => {
        this.resultaEmail=result
      })
      if( this.resultaEmail != null)
      { 
       this.verifMail = true

     }
     else{
      const newPatient=this.formModif.value
      let idPatient=newPatient.id
      try {
        this.servicePatient.modifierPatient(idPatient,newPatient).subscribe((resultData: any) => {
          this.patients.push(resultData)
          this.form.reset
          this.verifModifier=true
        });
      }
      catch(error){
        console.log(error)
      }
      //this.verifModifier=false
    }
  }
  }
  chercher(){
   /* this.servicePatient.getByTelephone(this.telephoneShearch).subscribe((result: any) => {
      this.patients = result
      console.log(this.patients)
    });*/


      this.servicePatient.getByNom(this.telephoneShearch).subscribe((result: any) => {
        this.patients = result
        console.log(this.patients)
      });


   /*(typeof(this.telephoneShearch) === 'number'){
    this.servicePatient.getById(this.telephoneShearch).subscribe((result: any) => {
      this.patients = result
      console.log(this.patients)
    });*/
  
  }
  refresh(){
    try {
      this.servicePatient.getPatientsNonArchiver().subscribe((resultData: any) => {
       this.patients=resultData
       console.log("mes patients"+this.patients)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  getIdPatient(idPatient:number){
    this.idPatient=idPatient
    console.log(this.idPatient)
  }
  getSelectedHeureDebut(event:any){
    let value = event.target.value;
    console.log(value)
    this.formRendezVous.get('heureDebut')?.setValue(value)
  }
  ajouterRendezVous(){
    console.log(this.idPatient)
    if(this.formRendezVous.valid){ 
      let newRendezVous=new RendezVous()
      newRendezVous.dateRendezVous=this.formRendezVous.value.dateRendezVous
      newRendezVous.heureDebut=this.formRendezVous.value.heureDebut
      try {
        this.serviceRendezVous.saveRendezVous(newRendezVous,this.idPatient).subscribe((resultData: any) => {
          this.formulaireValid=true
        });
      }
      catch (error) {
        console.log(error)
      }
    }
    else this.erreurFormulaire=true
  }
  verifierLesChampModif(){
    if(this.formModif.value.nom==""){
      this.verifNom=true
    }
    if(this.formModif.value.email==""){
      this.verifChampsMail=true
    }
    if(this.formModif.value.prenom==""){
      this.verifPrenom=true
    } 
    if(this.formModif.value.adr==""){
      this.verifAdr=true
    }
    if(this.formModif.value.codePostal== null ){
      this.verifCodePostal=true
    }
    if(this.formModif.value.dateNaissance==""){
      this.verifDateNaissance=true
    }
    if(this.formModif.value.telephone=="" ){
      this.verifTelephone=true
    }
  }
  getSelectedCivilite(event: any){
    let civilite = event.target.value;
    this.form.get('civilite')?.setValue(civilite)
  }

  getSelectedSexe(event: any){
    let sexe = event.target.value;
   this.form.get('sexe')?.setValue(sexe)
  }
  verifierLesChamps(){
    if(this.form.value.nom==""){
      this.verifNom=true
    }
    if(this.form.value.email==""){
      this.verifChampsMail=true
    }
    if(this.form.value.prenom==""){
      this.verifPrenom=true
    } 
    if(this.form.value.adr==""){
      this.verifAdr=true
    }
    if(this.form.value.codePostal== null ){
      this.verifCodePostal=true
    }
    if(this.form.value.dateNaissance==""){
      this.verifDateNaissance=true
    }
    if(this.form.value.telephone=="" ){
      this.verifTelephone=true
    }
    if(this.form.value.motDePasse==""){
      this.verifMotDePasse=true
    }
    if(this.confirmPassword==null ){
      this.verifConfirmPassword=true
    }
  }
  motDepassValidation(){
    if(this.form.value.motDePasse.length < 8){
      console.log(this.form.value.motDePasse.length)
        this.longMdp=true
    }
    if(this.form.value.motDePasse.indexOf(this.form.value.nom) != -1 || this.form.value.motDePasse.indexOf(this.form.value.prenom) != -1){
      console.log(this.form.value.motDePasse.length)
        this.contenuMdp=true
    }
  }

  ajouter(){
    this.verifierLesChamps()
    if(this.form.value.motDePasse === this.confirmPassword.nativeElement.value && this.confirmPassword.nativeElement.value !="" && this.form.valid && this.contenuMdp== false){
      this.servicePatient.getByEmail(this.form.value.email).subscribe((result: any) => {
        this.resultaEmail=result
      })
      if( this.resultaEmail != null)
      { 
       this.verifMail = true
       console.log(!this.resultaEmail)
       console.log("valider")
     }
     else{
      this.servicePatient.registerPatient(this.form.value).subscribe((result: any) => {
        this.valider = true
        this.egal = false
        this.verifMail = false
        this.patients.push(result)
        this.verifNom = false
        this.verifPrenom= false
        this.verifChampsMail= false
        this.verifTelephone= false
        this.verifCodePostal= false
        this.verifAdr= false
        this.verifMotDePasse= false
        this.verifConfirmPassword= false
        this.verifDateNaissance= false
        this.form.value.reset
      })
      this.valider = false
        this.egal = false
        this.verifMail = false
        this.verifNom = false
        this.verifPrenom= false
        this.verifChampsMail= false
        this.verifTelephone= false
        this.verifCodePostal= false
        this.verifAdr= false
        this.verifMotDePasse= false
        this.verifConfirmPassword= false
        this.verifDateNaissance= false
        this.form.value.reset
     }
    }
    else if(this.form.value.motDePasse !== this.confirmPassword.nativeElement.value){
      this.egal=true
    }
    else if(this.form){
      console.log("erreur")
    }
  }

  
}
