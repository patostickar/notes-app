import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
      /*
        setErrorMessage('wrong credentials');
        setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      */
    }
  };
};

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;
