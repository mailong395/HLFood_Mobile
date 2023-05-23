import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { TableContext } from '../../context/TableContext';
import { getAllCustomer } from '../../redux/api/bookingApi';
import { useEffect } from 'react';
import { useContext } from 'react';

const BookingTable = () => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  useEffect(() => {
    const fetch = async () => {
      await getAllCustomer(dispatch, userSelector?.data?.accessToken, axiosJWT);
    }
    fetch();
  }, []);

  return (
    <Container />
  )
}

export default BookingTable;

const styles = StyleSheet.create({});