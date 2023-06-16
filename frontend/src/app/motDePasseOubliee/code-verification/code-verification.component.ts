import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css']
})
export class CodeVerificationComponent implements OnInit {
  form!: FormGroup
  champsCode: boolean = false
  formaCode: boolean = false
  verifCode: boolean = false
  email!:any
  constructor(private serviceUtilisateur: UtilisateurService, public router: Router,private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required])
    })
  }
  monCode() {
    if (this.form.value.code === "") {
      this.champsCode = true
    }
    if (this.form.value.code.length < 6 || this.form.value.code.length > 10) {
      this.formaCode = true
    }
  }
  OnSubmit() {
      this.serviceUtilisateur.verifCode(this.form.value.code).subscribe((result: any) => {
        if (result === true) {
          this.email = this.activatedRoute.snapshot.paramMap.get("email")
          console.log("id Rendez vous " + this.email)
          localStorage.setItem('email', JSON.stringify(this.email))
          this.router.navigateByUrl('/updateMdp')
        }
        else 
        this.verifCode=true
      })
  }
}
