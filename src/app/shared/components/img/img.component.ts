import { Component, OnInit,Input,Output,EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent  {
  public img  :string ='';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') set changeImg(newImg:string){
    this.img= newImg;
    //console.log('change just img =>', this.img)
  }
  @Input() public alt  :string ='';
  @Output() loaded = new EventEmitter<string>();

  public imgDefault = './assets/images/descarga.png';
  // counter : number = 0;
  // counterFn :number | undefined;

  constructor() { }

  // ngOnChanges(changes: SimpleChanges): void {
  //    console.log('ngOnchanges','imgValue =>', this.img);
  //    console.log('changes', changes);

  // }


  // public imgLoaded(){
  //    console.log('log hijo')
  // }

  public imgError(){
       this.img = this.imgDefault;
       this.loaded.emit(this.img);
  }

}
