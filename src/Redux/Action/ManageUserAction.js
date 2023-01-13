
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