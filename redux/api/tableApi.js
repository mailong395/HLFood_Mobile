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
  addTableStart,
  addTableSuccess,
  addTableFailed,
} from '../slice/tableSlice';

import { REACT_APP_HOST_API } from '@env';
import { getAllTableMergeFailed, getAllTableMergeStart, getAllTableMergeSuccess } from '../slice/tableMergeSlice';
import { TOAST } from '../../config/lang_vn';
import { Toast } from '../../common/toast';

export const getAllTable = async (dispatch, params, accessToken, axiosJWT) => {
  dispatch(getAllTableStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_HOST_API}/api/tables`, {
      headers: { token: `bear ${accessToken}` },
      params: { ...params, is_deleted: false },
    });
    dispatch(getAllTableSuccess(res?.data));
  } catch (error) {
    dispatch(getAllTableFailed());
    console.log(error);
  }
};

export const getAllTableMerge = async (dispatch, params, accessToken, axiosJWT) => {
  dispatch(getAllTableMergeStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_HOST_API}/api/tables`, {
      headers: { token: `bear ${accessToken}` },
      params: { ...params, is_deleted: false },
    });
    dispatch(getAllTableMergeSuccess(res?.data));
  } catch (error) {
    dispatch(getAllTableMergeFailed());
    console.log(error);
  }
};

export const updateTable = async (dispatch, idTable, status, accessToken, axiosJWT) => {
  dispatch(updateTableStart());
  try {
    await axiosJWT.put(
      `${REACT_APP_HOST_API}/api/tables/status?id=${idTable}`,
      {
        status: status,
      },
      {
        headers: { token: `bear ${accessToken}` },
      },
    );
    dispatch(updateTableSuccess());
  } catch (error) {
    dispatch(updateTableFailed());
    console.log(error);
  }
};

export const mergeTable = async (dispatch, body, accessToken, axiosJWT) => {
  dispatch(tableMergeStart());
  try {
    await axiosJWT.post(`${REACT_APP_HOST_API}/api/tables:order`, body, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(tableMergeSuccess());
    Toast(TOAST.Merge_Success);
  } catch (error) {
    dispatch(tableMergeFailed());
    console.log(error);
    Toast(TOAST.Merge_fail);
  }
};

export const setEmpTable = async (dispatch, body, accessToken, axiosJWT) => {
  dispatch(updateTableStart());
  try {
    await axiosJWT.put(`${REACT_APP_HOST_API}/api/tables/emps`, body, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(updateTableSuccess());
  } catch (error) {
    dispatch(updateTableFailed());
    console.log(error);
  }
};

export const addTable = async (dispatch, body, accessToken, axiosJWT) => {
  dispatch(addTableStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_HOST_API}/api/tables`, body, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(addTableSuccess());
    return res?.data;
  } catch (error) {
    dispatch(addTableFailed());
    console.log(error);
  }
};

export const updateTableDetail = async (id, body, accessToken, axiosJWT) => {
  try {
    await axiosJWT.put(`${REACT_APP_HOST_API}/api/table`, body, {
      headers: { token: `bear ${accessToken}` },
      params: {id: id}
    });
  } catch (error) {
    console.log(error);
    throw new Error('Save Failed!');
  }
}; 
