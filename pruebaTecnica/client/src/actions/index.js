import axios from "axios";
import {
    GET_TASKS,
    EDIT_TASK,
    DELETE_TASK,
    ADD_TASK
} from "./actionTypes"


export const getAllTasks = () => {
    return async function (dispatch) {
        try {
            const res = await axios.get("/task");
            return dispatch({
                type: GET_TASKS,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const editTask = (id, body) => {
    return async function (dispatch) {
        try {
            //console.log("este es el body", body);
            const res = await axios.put(`/task/${id}`, body);

            return dispatch({
                type: EDIT_TASK,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteTask = (id) => {
    return async function (dispatch) {
        try {
            //console.log("este es el body", body);
            const res = await axios.delete(`/task/${id}`);

            return dispatch({
                type: DELETE_TASK,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const addTask = (body) => {
    return async function (dispatch) {
        try {
            console.log("este es el body en addtask", body);
            const res = await axios.post("/task", body);

            return dispatch({
                type: ADD_TASK,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};