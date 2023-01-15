
import { manageUserService } from './../../services/manageUserService';
import { message } from 'antd';
import { history } from '../../App';


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
            console.log('check user by id :' ,result)
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
            // console.log('error', error.response?.data)
        }
    }
}

export const UpdateUserAction = (id,dataUser) => {
    return async dispatch => {
        try {
            const result = await manageUserService.updateUser(id,dataUser);
            // console.log("check update:",result)
            if (result.status === 200) {
                await message.success("Cập nhập thành công !!!")
                history.push(`/Home/1`)
            // console.log('ok');
            }
            else {
                message.error("Cập nhập thất bại !!!")
            }
        } catch (error) {
            // console.log('ok');

            message.error("Cập nhập thất bại !!")
            console.log('error', error.response?.data)
        }
    }
}

export const DeleteUserAction = (id) => {
    return async dispatch => {
        try {
            const result = await manageUserService.delUser(id);
            if (result.status === 200) {
                message.success('Xóa thành công !!!')
                history.push(`/Home/1`)
                dispatch(GetListUserAction())
            }
            else {
                message.warning('Xóa thất bại !!!')
            }

        } catch (error) {
            message.warning('Xóa thất bại !!!')
            console.log('error', error.response?.data)
            // console.log('ok')

        }
    }
}