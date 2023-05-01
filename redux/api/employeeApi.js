import {
  getAllEmployeeFailed,
  getAllEmployeeStart,
  getAllEmployeeSuccess,
  updateEmployeeStart,
  updateEmployeeSuccess,
  updateEmployeeFailed,
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeFailed,
} from '../slice/employeeSlice';
import { REACT_APP_HOST_API } from '@env';

export const getAllEmplyee = async (dispatch, accessToken, axiosJWT) => {
  dispatch(getAllEmployeeStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_HOST_API}/api/employees:active`, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(getAllEmployeeSuccess(res?.data));
  } catch (error) {
    dispatch(getAllEmployeeFailed());
    console.log(error);
  }
};

export const addEmployee = async (dispatch, body, accessToken, axiosJWT) => {
  dispatch(addEmployeeStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_HOST_API}/auth/register`, body, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(addEmployeeSuccess(res.data));
  } catch (error) {
    dispatch(addEmployeeFailed());
  }
};

export const updateEmployee = async (dispatch, body, idEmp, accessToken, axiosJWT) => {
  dispatch(updateEmployeeStart());
  try {
    const res = await axiosJWT.put(`${REACT_APP_HOST_API}/api/employee`, body, {
      headers: { token: `bear ${accessToken}` },
      params: { id: idEmp },
    });
    dispatch(updateEmployeeSuccess());
  } catch (error) {
    dispatch(updateEmployeeFailed());
    console.log(error);
  }
};

export const deleteEmployee = async (dispatch, idEmp, accessToken, axiosJWT) => {
  dispatch(updateEmployeeStart());
  try {
    const res = await axiosJWT.delete(`${REACT_APP_HOST_API}/api/employee`, {
      headers: { token: `bear ${accessToken}` },
      params: { id: idEmp },
    });
    dispatch(updateEmployeeSuccess());
  } catch (error) {
    dispatch(updateEmployeeFailed());
    console.log(error);
  }
};
