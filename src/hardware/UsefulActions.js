import * as Action from './UserActions.js'
import * as API from './ApiInterface.js'


export const createList = async (dispatch) => {
    const users = await API.getList()
    dispatch({
        type: Action.CREATE_LIST,
        data: users
    })
}

export const updateList = async (timestamp, dispatch) => {
    const users = await API.updateList(timestamp)
    dispatch({
        type: Action.UPDATE_LIST,
        data: users
    })
}

export const updateUser = async (dispatch, usr) => {
    const user = await API.updateUser(usr)
    dispatch({
        type: Action.UPDATE_USER,
        data: user
    })
}

export const deleteUser = async (dispatch, id) => {
    const user = await API.deleteUser(id)
    dispatch({
        type: Action.DELETE_USER,
        data: user
    })
}