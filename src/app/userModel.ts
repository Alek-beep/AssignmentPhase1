export class UserModel {
    username: string;
    email: string;
    id: number;
    role: string;
    password: string;
    constructor(username: string, email:string, id:number, role:string, password: string){
        this.username = username;
        this.password = password
        this.email = email;
        this.id = id;
        this.role = role;
    }
}