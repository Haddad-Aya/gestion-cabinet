import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  patients: any[] = []
  telephoneShearch!:any
  ngOnInit(): void {
    this.getPatientsArchiver()
  }
  constructor(private servicePatient:PatientService,private router: Router){}

  desarchiverPatient(idPatient:number,patient:any){
    try {
      this.servicePatient.desArchiverPatient(idPatient,patient).subscribe((resultData: any) => {
        this.patients.splice(this.patients.indexOf(patient), 1);
       console.log(resultData)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  getPatientsArchiver(){
    try {
      this.servicePatient.getPatientsArchiver().subscribe((resultData: any) => {
       this.patients=resultData
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  chercher(){
    /* this.servicePatient.getByTelephone(this.telephoneShearch).subscribe((result: any) => {
       this.patients = result
       console.log(this.patients)
     });*/
 
       console.log(typeof(this.telephoneShearch))
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
}
