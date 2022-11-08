import axios from 'axios';
import apiEndPoints from "../../apiEndPoints"
import authAxios from '../../axios';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {User, UserSlice} from '../../types/storeSlices';
import {clearAuth} from '../../axios';

const initialState: UserSlice = {
  isLoggedIn: null,
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      if (action.payload === false) {
        clearAuth();
      }
      state.isLoggedIn = action.payload;
    },
    gotUser: (state, action) => {
      state.user = action.payload;
    }
  }
})

export default userSlice.reducer;
export const { loggedIn, gotUser } = userSlice.actions;
