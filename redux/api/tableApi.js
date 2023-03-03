import axios from "axios";

import {
    getAllTableFailed,
    getAllTableStart,
    getAllTableSuccess
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