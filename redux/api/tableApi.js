import axios from "axios";

import {
    getAllTableStart,
    getAllTableSuccess,
    getAllTableFailed,
    updateTableStart,
    updateTableSuccess,
    updateTableFailed,
} from "../slice/tableSlice";

import {
    getAllTableOfEmpFailed,
    getAllTableOfEmpStart,
    getAllTableOfEmpSuccess
} from "../slice/tableOfEmpSlice";

import { REACT_APP_HOST_API } from "@env"

export const getAllTable = async (dispatch) => {
    dispatch(getAllTableStart());
    try {
        const res = await axios.get(`${REACT_APP_HOST_API}/api/tables`);
        dispatch(getAllTableSuccess(res.data));
        return await res.data;
    } catch (error) {
        dispatch(getAllTableFailed());
        console.log(error);
    }
};

export const getListTableByIdEmp = async (dispatch, idEmp) => {
    dispatch(getAllTableOfEmpStart());
    try {
        const res = await axios.get(`${REACT_APP_HOST_API}/api/tables?employee=${idEmp}`);
        dispatch(getAllTableOfEmpSuccess(res.data));
    } catch (error) {
        dispatch(getAllTableOfEmpFailed());
        console.log(error);
    }
};

export const updateTable = async (dispatch, idTable, status) => {
    dispatch(updateTableStart());
    try {
        await axios.put(`${REACT_APP_HOST_API}/api/tables/status?id=${idTable}`, {
            status: status,
        });
        dispatch(updateTableSuccess());
    } catch (error) {
        dispatch(updateTableFailed());
        console.log(error);
    }
};

