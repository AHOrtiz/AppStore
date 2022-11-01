import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDTO, User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = ` https://damp-spire-59848.herokuapp.com/api/users`;

  constructor(private http :HttpClient) { }

  create(dto:CreateUserDTO){
     return this.http.post<User>(this.apiUrl,dto);
  }

  getAll(){
    return this.http.get<User[]>(this.apiUrl);
  }
}

