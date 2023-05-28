import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAllTable } from '../../redux/api/tableApi'
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { useEffect } from 'react';
import Container from './Container';

const TableReadOnly = () => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  useEffect(() => {
    const fetchData = async () => {
      await getAllTable(dispatch, { floor: 1 }, userSelector?.data?.accessToken, axiosJWT);
    }
    fetchData();
  }, [])


  return (
    <Container />
  )
}

export default TableReadOnly

const styles = StyleSheet.create({})