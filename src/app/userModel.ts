export class UserModel {
    username: string;
    email: string;
    id: number;
    role: string;
    constructor(username: string, email:string, id:number, role:string){
        this.username = username;
        this.email = email;
        this.id = id;
        this.role = role;
    }
}