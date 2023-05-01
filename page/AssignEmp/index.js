import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getAllTableMerge } from '../../redux/api/tableApi';
import { useDispatch, useSelector } from 'react-redux';
import Container from './Container';
import { loginSuccess } from '../../redux/slice/authSlice';
import { createAxios } from '../../redux/createInstance';

const AssignEmp = ({ navigation, route }) => {
  const { emp } = route?.params;

  return <Container navigation={navigation} emp={emp} />;
};

export default AssignEmp;

const styles = StyleSheet.create({});
