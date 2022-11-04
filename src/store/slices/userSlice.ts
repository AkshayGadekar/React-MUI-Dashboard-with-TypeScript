import axios from 'axios';
import apiEndPoints from "../../apiEndPoints"
import authAxios from '../../axios';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {User, UserSlice} from '../../types/storeSlices';
import {clearAuth} from '../../axios';

const initialState: UserSlice = {
  isLoggedIn: null,
  user: {},
  loading: false,
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchUser = createAsyncThunk('user/fetchUser', () => {
  return authAxios({...apiEndPoints.auth.getUserDetails}).then(response => response.data);
})

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
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false
        state.user = action.payload
        state.error = ''
      }
    )
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
      state.user = {}
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default userSlice.reducer;
export const { loggedIn, gotUser } = userSlice.actions;
