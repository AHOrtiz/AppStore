import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activeMenu= false;
  counter = 0

  profile:User|null=null;

  constructor(private store: StoreService, private auth:AuthService) { }

  ngOnInit(): void {
    this.store.myCart$.subscribe(products =>{
      this.counter=products.length;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.auth.loginAndGet('allis@gmail.com','1212')
    .subscribe(user=>{
      this.profile = user;
    })
  }


}
