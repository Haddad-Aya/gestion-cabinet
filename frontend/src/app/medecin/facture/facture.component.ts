import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StatistiqueService } from 'src/app/services/statistique.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit{
  factures!:any
  constructor(private serviceStatistique:StatistiqueService, private build: FormBuilder,private router: Router){}
  ngOnInit(): void {
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

}
