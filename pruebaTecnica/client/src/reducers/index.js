import { ADD_TASK, DELETE_TASK, EDIT_TASK, GET_TASKS } from "../actions/actionTypes"

const initialState = {
    allTasks: [],
    editTasks: [],
    deleteTasks: [],
    addTasks: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            let noFinishTask = action.payload.filter(e => e.status !== "Terminada")
            let finishTask = action.payload.filter(e => e.status === "Terminada")

            return {
                ...state,
                allTasks: noFinishTask.concat(finishTask)
            }
        case EDIT_TASK:
            return {
                ...state,
                editTasks: action.payload
            }
        case DELETE_TASK:
            return {
                ...state,
                deleteTasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                addTasks: action.payload
            }
        default:
            return state
    }
}