import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

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
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.auth.user$
    .subscribe(data=>{
      this.profile = data;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.auth.loginAndGet('john@mail.com', 'changeme')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  getAllCategories(){
    this.categoryService.getAll()
      .subscribe(data=>{
        this.categories = data
       })
  }
  logout(){
    this.auth.logout();
    this.profile = null;
    this.router.navigate(['/home'])
  }
}
