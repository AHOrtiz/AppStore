import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OnExit } from 'src/app/guards/exit.guard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnExit {

  constructor() { }



  onExit(){
    const confirm = Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false
    });
    return confirm

    // const rta = confirm ('Logica desde comp, estas seguro salir');
    // return rta
  }
}
