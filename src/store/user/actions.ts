import axios from "axios"

import { logAPIErrors } from "../../utils";

import store from "..";
import { ADD_USER } from "./reducer";

import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginParamType = {
  email: string,
  password: string,
  fcmToken: string,
};

export const login = async (params: LoginParamType) => {
  const apiName = '/auth/login';
  return await axios.post(apiName, params).then(res => {
    const { data } = res;
    AsyncStorage.setItem('authToken', data?.token);
    store.dispatch(ADD_USER(data?.user));
    return true;
  }).catch(error => {
    logAPIErrors(apiName, "POST", error);
    return false;
  });
}

type RegisterParamType = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
};

export const register = async (params: RegisterParamType) => {
  const apiName = '/auth/register';
  return await axios.post(apiName, params).then(res => {
    console.log(res.data);
    return true;
  }).catch(error => {
    logAPIErrors(apiName, "POST", error);
    return false;
  });
}

export const fetchUser = async (token: string) => {
  const apiName = '/user';
  return await axios.get(apiName).then(res => {
    const { data } = res;
    console.log(data);
    store.dispatch(ADD_USER(data));
    return true;
  }).catch(error => {
    logAPIErrors(apiName, "GET", error);
    return false;
  });
}