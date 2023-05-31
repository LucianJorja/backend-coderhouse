import { messagesModel } from "./models/messagesModel.js";

export default class MessagesDao{

    async createMsg(msgData){
        try {
            const msg = await messagesModel.create(msgData);
            return msg;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllMessages(){
        try {
            const msg = await messagesModel.find();
            return msg;
        } catch (error) {
            console.log(error);
        }
    }
}