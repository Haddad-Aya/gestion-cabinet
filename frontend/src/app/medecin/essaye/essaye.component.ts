import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-essaye',
  templateUrl: './essaye.component.html',
  styleUrls: ['./essaye.component.css']
})
export class EssayeComponent implements OnInit{

  constructor(private router: Router,private serviceToken:TokenService){}
  ngOnInit(): void {
  }
  logout(){
    this.serviceToken.clearToken()
  }
}