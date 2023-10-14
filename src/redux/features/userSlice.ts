import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TQueryUser, TUserResponse } from '../../types/ApiTypes';
import { RootState } from '../store';

type TUserInitialState = {
  accessToken: string | null;
  user: TQueryUser | null;
};

const initialState: TUserInitialState = {
  accessToken: null,
  user: null
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logoutUser: (state) => {
      localStorage.clear();
      (state.accessToken = null), (state.user = null);
    },
    setUser: (state, action: PayloadAction<TUserResponse>) => {
      localStorage.setItem('token', JSON.stringify(action.payload.accessToken));
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    }
  }
});

export const selectUser = (state: RootState) => state.userState;
export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
