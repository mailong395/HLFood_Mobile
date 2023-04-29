import axios from "axios";

import {
  getAllTableStart,
  getAllTableSuccess,
  getAllTableFailed,
  updateTableStart,
  updateTableSuccess,
  updateTableFailed,
  tableMergeStart,
  tableMergeSuccess,
  tableMergeFailed,
} from "../slice/tableSlice";

import {
  getAllTableOfEmpFailed,
  getAllTableOfEmpStart,
  getAllTableOfEmpSuccess
} from "../slice/tableOfEmpSlice";

import { REACT_APP_HOST_API } from "@env"
import { getAllTableMergeFailed, getAllTableMergeStart, getAllTableMergeSuccess } from "../slice/tableMergeSlice";

export const getAllTable = async (dispatch, params, accessToken) => {
  dispatch(getAllTableStart());
  try {
    const res = await axios.get(`${REACT_APP_HOST_API}/api/tables`, { params }, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(getAllTableSuccess(res?.data));
  } catch (error) {
    dispatch(getAllTableFailed());
    console.log(error);
  }
};

export const getAllTableMerge = async (dispatch, params, accessToken) => {
  dispatch(getAllTableMergeStart());
  try {
    const res = await axios.get(`${REACT_APP_HOST_API}/api/tables`, { params }, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(getAllTableMergeSuccess(res?.data));
  } catch (error) {
    dispatch(getAllTableMergeFailed());
    console.log(error);
  }
};

export const updateTable = async (dispatch, idTable, status, accessToken) => {
  dispatch(updateTableStart());
  try {
    await axios.put(`${REACT_APP_HOST_API}/api/tables/status?id=${idTable}`, {
      status: status,
    }, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(updateTableSuccess());
  } catch (error) {
    dispatch(updateTableFailed());
    console.log(error);
  }
};

export const mergeTable = async (dispatch, body, accessToken) => {
  dispatch(tableMergeStart());
  try {
    await axios.post(`${REACT_APP_HOST_API}/api/tables:order`, body, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(tableMergeSuccess());
  } catch (error) {
    dispatch(tableMergeFailed());
    console.log(error);
  }
}