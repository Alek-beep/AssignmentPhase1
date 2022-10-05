import { UserModel } from './userModel';
export class ChannelModel {
    channelName:string;
    users:[UserModel];
    constructor(channelname: string, users: any){
        this.channelName = channelname;
        this.users = users;
    }
}