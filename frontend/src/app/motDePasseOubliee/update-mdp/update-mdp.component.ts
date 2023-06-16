import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-update-mdp',
  templateUrl: './update-mdp.component.html',
  styleUrls: ['./update-mdp.component.css']
})
export class UpdateMdpComponent implements OnInit{
  updateForm!: FormGroup
  motDePasse!:string
  monEmail!:any
  @ViewChild('confirmPassword', { static: false })
  confirmPassword!: ElementRef;
  verifEmail:boolean=false
  longMdp:boolean=false
  contenuMdp:boolean=false
  verifMotDePasse: boolean = false
  verifConfirmPassword: boolean = false
  erreurFormulaire:boolean=false
  formulaireValid:boolean=false
  verifModifier:boolean=false
  verifMail:boolean=false
  constructor(private serviceUtilisateur: UtilisateurService, private build: FormBuilder,private router: Router){}
  ngOnInit(): void {
    this.updateForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      motDePasse: new FormControl('', [Validators.required,Validators.minLength(8)])
    })
    this.monEmail=JSON.parse(localStorage.getItem("email")!)
  }
  motDepassValidation(){
    if(this.updateForm.value.motDePasse.length < 8){
      console.log(this.updateForm.value.motDePasse.length)
        this.longMdp=true
    }
    else this.longMdp=false
    try {
      this.serviceUtilisateur.getUserByEmail(this.monEmail).subscribe((resultData: any) => {
        console.log(resultData.nom,resultData.prenom)
        if(this.updateForm.value.motDePasse.indexOf(resultData.nom) != -1 || this.updateForm.value.motDePasse.indexOf(resultData.prenom) != -1)
        this.contenuMdp=true
        else this.contenuMdp=false
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  verifierLesChamps(){
    if(this.updateForm.value.email==""){
      this.verifEmail=true
    }
    if(this.updateForm.value.motDePasse==""){
      this.verifMotDePasse=true
    }
    if(this.confirmPassword == null){
      this.verifConfirmPassword=true
    }
    if(this.confirmPassword.nativeElement.value != this.updateForm.value.motDePasse){

    }
  }
  modifierMdp(){
    this.verifierLesChamps()
    if(this.updateForm.valid && 
      this.confirmPassword.nativeElement.value == this.updateForm.value.motDePasse && 
      this.confirmPassword.nativeElement.value != ""  &&
      this.updateForm.value.email == this.monEmail &&
      this.updateForm.value.motDePasse.length > 8 &&
      this.contenuMdp == false) {
        try {
          console.log(this.updateForm.value)
          this.serviceUtilisateur.updateMdpUser(this.updateForm.value).subscribe((resultData: any) => {
            this.verifModifier=true
           localStorage.removeItem('email')
           this.router.navigateByUrl('/login')
          });
        }
        catch (error) {
          console.log(error)
        }
    }
  }

}
