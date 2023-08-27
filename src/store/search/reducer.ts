import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../user/reducer";

interface SearchInitialState {
  searchUser: Array<UserType>,
};

const initState: SearchInitialState = {
  searchUser: [],
};

export const search = createSlice({
  name: 'Search',
  initialState: initState,
  reducers: {
    ADD_SEARCH_USERS: (state, action) => {
      state.searchUser = action.payload;
    },
  },
});

export const {
  ADD_SEARCH_USERS,
} = search.actions;
