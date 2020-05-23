import { Injectable, Inject } from '@angular/core';
import { Users } from "../models/users";
import { HttpClient } from "@angular/common/http";
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Users[] = [];

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    if (typeof Storage !== "undefined") {
      if (localStorage.length > 0) {              //verifica se localStorage está vazio
        return localStorage.getItem("users");
      }
      else {
        return null;
      }
    } else {
      return "Esse navegador não suporta localStorage!";
    }
  }

  addUsers(user) {
    if (typeof Storage !== "undefined") {
      this.users = JSON.parse(this.getUsers());
      if (this.users == null) {
        this.users = [];
      }
      this.users.push(user);
      localStorage.setItem("users", JSON.stringify(this.users));
    } else {
      return "Esse navegador não suporta localStorage!";
    }
  }

  async getCep(cep): Promise<any> {
    let endereco;
    await this.httpClient.get(`https://viacep.com.br/ws/${cep}/json`).toPromise().then(resposta => {
      endereco = resposta;
      console.log(endereco)
    });
    return endereco;
  }
}

