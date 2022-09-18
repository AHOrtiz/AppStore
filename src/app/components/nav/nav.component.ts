import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activeMenu= false;
  counter = 0

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.store.myCart$.subscribe(products =>{
      this.counter=products.length;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

}