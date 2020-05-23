export class Users {

    constructor(
        public nome: string,
        public cpf: number,
        public nascimento: number,
        public telefone: number,
        public email: number,
        public cep: number,
        public logradouro: string,
        public complemento: string,
        public bairro: string,
        public cidade: string,
        public uf: string
    ) {
    }
}
