import axios from "axios";
import { getAllTableFailed, getAllTableStart, getAllTableSuccess } from "../slice/tableSlice";
import { REACT_APP_HOST_API } from "@env"

export const getAllTable = async (dispatch) => {
    dispatch(getAllTableStart());
    try {
        console.log(REACT_APP_HOST_API);
        const res = await axios.get(`${REACT_APP_HOST_API}/api/tables`);
        dispatch(getAllTableSuccess(res.data));
    } catch (error) {
        dispatch(getAllTableFailed());
        console.log(error);
    }
};