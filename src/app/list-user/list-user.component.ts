import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Users } from "../models/users";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: Users[] = [];
  showUser: boolean = true;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.loadListUsers();
  }

  loadListUsers() {
    this.users = JSON.parse(this._userService.getUsers());
    if (this.users !== null) {
      this.showUser = true;
    } else {
      this.showUser = false;
    }
  }

  receberUsers(users){
    this.users = users;
    if(this.users !== null){
      this.showUser = true;
  } else {
    this.showUser = false;
  }
}
}