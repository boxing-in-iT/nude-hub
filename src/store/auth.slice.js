import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { alertActions } from "./alert.slice";
import history from "../helpers/history";
import fetchWrapper from "../helpers/fetch-wrapper";
// create slice

const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    // initialize state from local storage to enable user to stay logged in
    value: JSON.parse(localStorage.getItem("auth")),
  };
}

function createReducers() {
  return {
    setAuth,
  };

  function setAuth(state, action) {
    state.value = action.payload;
  }
}

function createExtraActions() {
  return {
    login: login(),
    logout: logout(),
  };

  function login() {
    return createAsyncThunk(
      `/login`,
      async function ({ email, password }, { dispatch }) {
        dispatch(alertActions.clear());
        debugger;
        try {
          const response = await fetchWrapper.post(
            `http://3.72.65.135:8080/api/users/sign-in`,
            { email, password }
          );

          // если ответ успешный, запишите пользователя в состояние Redux
          dispatch(authActions.setAuth(response.data));

          // сохраните детали пользователя и токен JWT в localStorage
          localStorage.setItem("auth", JSON.stringify(response.data));

          // перейдите на нужную страницу после успешного входа
          const { from } = history.location.state || {
            from: { pathname: "/" },
          };
          history.navigate(from);
        } catch (error) {
          // извлеките сообщение из ошибки и передайте его в alert
          const errorMessage =
            error.response?.data?.message || "An unknown error occurred";
          dispatch(alertActions.error({ message: errorMessage }));
          throw new Error(errorMessage); // Передайте ошибку выше в компонент
        }
      }
    );
  }

  function logout() {
    return createAsyncThunk(`${name}/logout`, function (arg, { dispatch }) {
      dispatch(authActions.setAuth(null));
      localStorage.removeItem("auth");
      history.navigate("/account/login");
    });
  }
}
