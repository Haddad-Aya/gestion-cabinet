import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-mdp-oublier',
  templateUrl: './mdp-oublier.component.html',
  styleUrls: ['./mdp-oublier.component.css']
})
export class MdpOublierComponent implements OnInit{
  email!:string
  form!:FormGroup
  resultMail!:any
  verifMail:boolean=false
  champsMail:boolean=false
  formaMail:boolean=false
ngOnInit(): void {
  this.form=new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required])
  })
}
constructor(private serviceUtilisateur:UtilisateurService, public router : Router){}

mail(){
  if(this.form.value.email === "")
{this.champsMail=true}
if(this.form.value.email.length < 6 || this.form.value.email.indexOf("@") === -1 || this.form.value.email.indexOf(".") === -1){
this.formaMail=true
}
}
OnSubmit(){
  if(this.form.value && this.form.value.email.length > 6 && this.form.value.email.indexOf("@") !== -1 && this.form.value.email.indexOf(".") !== -1){

      this.serviceUtilisateur.getUserByEmail(this.form.value.email).subscribe(res =>{
        console.log(res)
        this.resultMail=res
        if(this.resultMail != null){
          this.router.navigateByUrl('/codeEnvoyer/'+ this.form.value.email)
        }
        else 
        this.verifMail=true
      })
    
    }
    
}

}
