import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imgParent = '';
  public showImg = true;
  token ='';
  imgRta = '';


  constructor(private authService:AuthService , private  UsersService:UsersService, private filesService:FilesService){}

  public onLoaded(img :string){
    console.log('log padre', img);
  }

  public toggleImg(){
     this.showImg = !this.showImg;
  }

  createUser(){
    this.UsersService.create(
      {
        name:'Allis',
        email:'allis@gmail.com',
        password:'1212'
      })
    .subscribe(rta=>{
      console.log(rta);
    })
  }

  login(){
  this.authService.login( 'allis@gmail.com','1212')
     .subscribe(rta=>{
      console.log(rta.access_token)
      console.log(rta)
      this.token=rta.access_token;
      console.log(this.token)
     })
  }

  downloadPdf(){
    this.filesService.getFile('my.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
     .subscribe()
  }

  onUpload(event :Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.filesService.upLoadFile(file)
      .subscribe(rta=>{
        this.imgRta = rta.location;
      })
    }

  }

}

