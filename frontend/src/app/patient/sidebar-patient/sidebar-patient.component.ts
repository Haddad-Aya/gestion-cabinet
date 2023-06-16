import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebar-patient.component.html',
  styleUrls: ['./sidebar-patient.component.css']
})
export class SidebarPatientComponent  implements OnInit{

  constructor(private router: Router,private serviceToken:TokenService){}
  ngOnInit(): void {
  }
  logout(){
    this.serviceToken.clearToken()
  }
}
