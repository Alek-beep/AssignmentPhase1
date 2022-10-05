import { ChannelModel } from './channelModel'
import { UserModel } from './userModel';
export class GroupModel {
    name: string;
    users: [UserModel];
    channels: [ChannelModel];
    constructor(name: string, users:any, channels:any){
        this.name = name;
        this.users = users;
        this.channels = channels;
    }
}