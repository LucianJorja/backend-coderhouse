import { getAllMsgService, createMsgService } from "../services/messagesServices.js";

export const getAllMsgController = async (req, res, next) => {
    try {
        const msg = await getAllMsgService();
        res.json(msg);
    } catch (error) {
        next(error);
    }
};

export const createMsgController = async (req, res, next) => {
    try {
        const { user, message } = req.body;
        const newMsg = await createMsgService({ user, message });
        res.json(newMsg);
    } catch (error) {
        next(error);
    }
};