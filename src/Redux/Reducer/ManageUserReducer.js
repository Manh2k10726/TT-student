
const initialState = {
    lstUser: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export const ManageUserReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_LIST_USER": {
            state.lstUser = action.dataUser
            return { ...state }
        }
        default:
            return state
    }
}