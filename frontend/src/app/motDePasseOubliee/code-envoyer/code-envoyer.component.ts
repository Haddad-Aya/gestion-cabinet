import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-code-envoyer',
  templateUrl: './code-envoyer.component.html',
  styleUrls: ['./code-envoyer.component.css']
})
export class CodeEnvoyerComponent implements OnInit{
  email!:any
  constructor(private serviceUtilisateur:UtilisateurService,private router: Router,private activatedRoute: ActivatedRoute){
    this.email = this.activatedRoute.snapshot.paramMap.get("email")
    console.log("id Rendez vous " + this.email)
  }
  ngOnInit(): void {

  }
  envoiCode(){
    this.serviceUtilisateur.sendMail(this.email).subscribe((result: any) => {
      this.router.navigateByUrl('/codeVerif/'+this.email)
    })
  }

}
