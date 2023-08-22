export default class Services {
    constructor(manager) {
        this.manager = manager;
    }

    getAll = async () => {
        try {
            const items = await this.manager.getAll();
            return items;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getById = async (id) => {
        try {
            const item = await this.manager.getById(id);
            if (!item) return false
            else return item;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    create = async (obj) => {
        try {
            const newItem = await this.manager.create(obj);
            if (!newItem) return false;
            else return newItem;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    update = async (id, obj) => {
        try {
            const item = await this.manager.getById(id);
            if (!item) {
                return false
            } else {
                const itemUpd = await this.manager.update(id, obj)
                return itemUpd;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    delete = async (id) => {
        try {
            const itemDel = await this.manager.delete(id);
            return itemDel;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}