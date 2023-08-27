import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  created_at: string,
  __v: number,
  fcmToken: string | null,
};

interface initState {
  user: UserType,
};

const initState: initState = {
  user: {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    created_at: '',
    __v: 0,
    fcmToken: null
  },
};

export const user = createSlice({
  name: 'User',
  initialState: initState,
  reducers: {
    ADD_USER: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    }
  },
});

export const {
  ADD_USER,
} = user.actions;
