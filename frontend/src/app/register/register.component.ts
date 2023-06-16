import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { medecin } from '../classes/medecin';
import { PatientService } from '../services/patient.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('confirmPassword', { static: false })
  confirmPassword!: ElementRef;
  valider: boolean = false
  remplir: boolean = false
  egal: boolean = false
  verifMail: boolean = false
  nom!: string
  prenom!: string
  email!: string
  telephone!: number
  motDePasse!: string
  adr!: string
  dateNaissance!:Date
  codePostal!: string
  vMotDePasse!: string
  idCnam!: number
  form!: FormGroup
  ifMail!: any
  i!:number
  verifNom: boolean = false
  verifPrenom: boolean = false
  verifChampsMail: boolean = false
  verifTelephone: boolean = false
  verifCodePostal: boolean = false
  verifAdr: boolean = false
  verifMotDePasse: boolean = false
  verifConfirmPassword: boolean = false
  verifDateNaissance: boolean = false
  longMdp:boolean=false
  contenuMdp:boolean=false
  resultaEmail:any
  constructor(private servicePatient: PatientService,private serviceUtilisateur: UtilisateurService, private build: FormBuilder,public router: Router,private serviceToken:TokenService){

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
  }

  ngOnInit(): void {
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

  getSelectedCivilite(event: any){
    let civilite = event.target.value;
    this.form.get('civilite')?.setValue(civilite)
  }

  getSelectedSexe(event: any){
    let sexe = event.target.value;
   this.form.get('sexe')?.setValue(sexe)
  }
  ajouter() {
    this.verifierLesChamps()
    if(this.form.value.motDePasse === this.confirmPassword.nativeElement.value && this.confirmPassword.nativeElement.value !="" && this.form.valid){
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
        this.serviceUtilisateur.registerPatient(this.form.value).subscribe((result: any) => {
          this.serviceToken.saveToken(result.accessToken)
          this.serviceToken.saveRole(result.role)
          this.serviceToken.saveRefreshToken(result.refreshToken)
          this.valider = true
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
        this.router.navigateByUrl("/dashboardHomePatient")
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
