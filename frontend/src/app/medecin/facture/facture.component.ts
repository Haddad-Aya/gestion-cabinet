import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Fichier } from 'src/app/classes/Fichiers';
import { fichier } from 'src/app/classes/file';
import { StatistiqueService } from 'src/app/services/statistique.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit{
  factures!:any
  formFichier!: FormGroup
  formFacture!: FormGroup
  fichier!:Fichier
  idMedecin!:number
  valider:boolean=false
  remplir:boolean=false
  verifDate:boolean=false
  verifPrix:boolean=false
  verifTitre:boolean=false
  constructor(private serviceStatistique:StatistiqueService, private build: FormBuilder,private router: Router, private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.idMedecin=JSON.parse(localStorage.getItem("id")!) 
     //init formulaire fichier
     this.formFichier = new FormGroup({
      titre:new FormControl('', [Validators.required]),
      nom:new FormControl('', [Validators.required])
    })
    //init formulaire facture
    this.formFacture = new FormGroup({
      titre:new FormControl('', [Validators.required]),
      prix:new FormControl('', [Validators.required]),
      dateFacture:new FormControl('', [Validators.required])
    })
      this.afficher()
  }
  afficher(){
    try {
      this.serviceStatistique.getAllFacture().subscribe((resultData: any) => {
       this.factures=resultData
       console.log(this.factures)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  onFileSelected(event:any){
if(event.target.files){
  const file = event.target.files[0]

  const myFile: fichier = {
    file: file,
    url:this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    )
  }
  this.fichier.nom.push(myFile)
}
  }
  ajouter(){
    if(this.formFacture.value.titre = ""){
      this.verifTitre=true
    }
    if(this.formFacture.value.prix =""){
      this.verifPrix=true
    }
    if(this.formFacture.value.dateFacture = ""){
      this.verifDate=true
    }
    if(this.formFacture.valid){
      try {
        this.serviceStatistique.saveFacture(this.formFacture.value,this.idMedecin).subscribe((resultData: any) => {
     this.valider=true
     this.factures.push(resultData)
        });
      }
      catch (error) {
        console.log(error)
      }
    }
    else this.remplir=true
  }

}
