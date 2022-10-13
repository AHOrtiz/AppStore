import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { category } from '../../models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  categories:category[]=[];

  profile: User | null = null;

  constructor(
    private store: StoreService,
    private auth: AuthService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.store.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.auth.loginAndGet('allis@gmail.com', '1212').subscribe((user) => {
      this.profile = user;
    });
  }

  getAllCategories(){
    this.categoryService.getAll()
      .subscribe(data=>{
        this.categories = data
       })
  }
}
