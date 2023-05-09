import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/frontOffice/user/auth.service';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.css']
})
export class HeaderBackComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.signout();
  }

}
