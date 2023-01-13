
import { manageUserService } from './../../services/manageUserService';
import { message } from 'antd';


export const GetListUserAction = (page) => {
    return async dispatch => {
        try {
            const result = await manageUserService.getList(page);
            if (result.status === 200) {
                dispatch({
                    type: 'GET_LIST_USER',
                    dataUser: result.data
                })

            }
            else {
                message.error("Không lấy được danh sách sinh viên!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const AddUserAction = (dataUser) => {
    return async dispatch => {
        try {
            const result = await manageUserService.addUser(dataUser);
            if (result.status === 200) {
                message.message("Thêm mới thành công")
            }
            else {
                message.error("Thêm mới thất bại!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const GetUserByIdAction = (id) => {
    return async dispatch => {
        try {
            const result = await manageUserService.getDetail(id);
            if (result.status === 200) {
                dispatch({
                    type: 'GET_USER_ID',
                    dataUserById: result.data
                })
                message.message(" lấy sinh viên thành công!")
            }
            else {
                message.error("Không lấy được sinh viên!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}