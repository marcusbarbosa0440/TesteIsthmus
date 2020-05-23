import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Users } from "../models/users";
import { UserService } from "../services/user.service";

declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  formUser: FormGroup;
  submitted = false;
  users: Users[];

  @Output() enviar = new EventEmitter<Users[]>();

  constructor(
    private fb: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      nomes: ['', Validators.required],
      cpf: ['', Validators.required],
      nascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });
  }

  get nomes() {
    return this.formUser.get('nomes');
  }
  get cpf() {
    return this.formUser.get('cpf');
  } get nascimento() {
    return this.formUser.get('nascimento');
  } get telefone() {
    return this.formUser.get('telefone');
  } get email() {
    return this.formUser.get('email');
  } get cep() {
    return this.formUser.get('cep');
  } get logradouro() {
    return this.formUser.get('logradouro');
  } get complemento() {
    return this.formUser.get('complemento');
  } get bairro() {
    return this.formUser.get('bairro');
  } get cidade() {
    return this.formUser.get('cidade');
  } get uf() {
    return this.formUser.get('uf');
  }

  async buscaCep(valor) {
    console.log(valor)
    const cepBusca = valor;
    await this._userService.getCep(cepBusca).then(resposta=> {
      if(!resposta){
        this.formUser.get('bairro').setValue(resposta.bairro);
      }
    } );
  }

  guardarUsers() {
    this.submitted = true;
    if (this.formUser.invalid) {
      return;
    }
    this._userService.addUsers(this.formUser.value);
    this.users = JSON.parse(this._userService.getUsers());
    this.enviar.emit(this.users);
    $('addUserModal').modal('hide');
    this.limpar();
  }

  limpar() {
    this.submitted = false;
    this.formUser.reset();
  }
}
