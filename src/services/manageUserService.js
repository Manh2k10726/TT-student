import { baseService } from './baseService';

class ManageUserService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getList = (page) => {
        return this.get(`employee?page=${page}&size=4`)
    }

    addUser = (dataUser) => {
        return this.post(`employee`, dataUser)
    }

    getDetail = (id) => {
        return this.get(`employee/${id}`)
    }

    updateUser = (id, data) => {
        return this.put(`employee/${id}`, data)
    }

    delUser = (id) => {
        return this.delete(`employee/${id}`)
    }
}


export const manageUserService = new ManageUserService();