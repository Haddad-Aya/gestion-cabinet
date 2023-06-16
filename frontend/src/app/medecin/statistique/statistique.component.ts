import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StatistiqueService } from 'src/app/services/statistique.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit{
  vMois=[
    {"valeur":"01"},
    {"valeur":"02"},
    {"valeur":"03"},
    {"valeur":"04"},
    {"valeur":"05"},
    {"valeur":"06"},
    {"valeur":"07"},
    {"valeur":"08"},
    {"valeur":"09"},
    {"valeur":"10"},
    {"valeur":"11"},
    {"valeur":"12"}
  ]
  annee!:number
  value!:any
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();

  ngOnInit(): void {
    console.log(this.todayNumber)
    console.log(this.todayDate)
    console.log(this.todayString)
    console.log(this.todayISOString)
    console.log(new Date('2023-05-24T09:30:00').toISOString())
  }
  getSelectedMois(event:any){
    this.value = event.target.value;
    console.log(this.value)
  }
  getResultat(){

  }
  refresh(){

  }
}
