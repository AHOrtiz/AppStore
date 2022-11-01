import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  imgParent = '';
  public showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private UsersService: UsersService,
    private filesService: FilesService,
    private tokenservice: TokenService
  ) {}

  ngOnInit(){
    const token = this.tokenservice.getToken();
    if(token){
      this.authService.profile()
      .subscribe()
    }
  }

  public onLoaded(img: string) {
    console.log('log padre', img);
  }

  public toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.UsersService.create({
      name: 'Allis',
      email: 'john@mail.com',
      password: 'changeme',
      role: 'customer ',
    }).subscribe((rta) => {
      console.log(rta);
    });
  }

  login() {
    this.authService.login('allis@gmail.com', '1212').subscribe((rta) => {
      console.log(rta.access_token);
      console.log(rta);
      this.token = rta.access_token;
      console.log(this.token);
    });
  }

  downloadPdf() {
    this.filesService
      .getFile(
        'my.pdf',
        ' https://damp-spire-59848.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.upLoadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }
}
