import MessagesDao from "../daos/mongodb/messagesDao.js";
const messagesDao = new MessagesDao();

export const getAllMsgService = async () =>{
    try {
        const msg = await messagesDao.getAllMessages();
        return msg;
    } catch (error) {
        console.log(error);
    }
}

export const createMsgService = async (msgData) =>{
    try {
        const newMsg = await messagesDao.createMsg(msgData);
        if(!newMsg) throw new Error("Couldn't create message");
        else return newMsg;
    } catch (error) {
        console.log(error);   
    }
}
