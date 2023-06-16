import { Component,OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!:FormGroup
  email!: string
  motDePasse!: string
  verif:any
  token!:string
  invalid:boolean=false
  remplir:boolean=false

  constructor(private serviceToken:TokenService,private serviceUtilisateur:UtilisateurService, public router : Router) {
    
    }
  ngOnInit(): void {
    this.form=new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      motDePasse:new FormControl('',[Validators.required])
    })
  }
  OnSubmit(){

    if(this.form.value){
      this.serviceUtilisateur.login(this.form.value).subscribe(res =>{

        this.serviceToken.saveToken(res.accessToken)
        this.serviceToken.saveRole(res.role)
        this.serviceToken.saveRefreshToken(res.refreshToken)
        this.serviceToken.saveId(res.id)
        const role = res.role

        if(role === 'ADMIN'){
          this.router.navigateByUrl('/dashboardMedecin')
        }
        else if(role === 'USER'){
          this.router.navigateByUrl("/dashboardHomePatient")
      }

    })
    }

}

}
