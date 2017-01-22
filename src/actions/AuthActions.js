import {LOGIN, REGISTER, LOGOUT} from '../constants/ActionTypes';
import {Account} from '../api/resources';

export const login = (username, password) => ({
    type: LOGIN,
    payload: Account.login(username, password)
});

export const register = (email, username, password) => ({
  type: REGISTER,
  payload: Account.register(email, username, password)
});

export const logout = () => ({
  type: LOGOUT
});
