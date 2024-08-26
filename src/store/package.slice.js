import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchWrapper from "../helpers/fetch-wrapper";
import { alertActions } from "./alert.slice";

// Create slice
const name = "packages";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

// Exports
export const packagesActions = { ...slice.actions, ...extraActions };
export const packagesReducer = slice.reducer;

// Implementation
function createInitialState() {
  return {
    items: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
    paymentStatus: "idle", // idle, loading, succeeded, failed
    sessionUrl: null,
  };
}

function createReducers() {
  return {
    setPackages: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload.status;
      state.sessionUrl = action.payload.sessionUrl || null;
    },
  };
}

function createExtraActions() {
  return {
    fetchPackages: fetchPackages(),
    createPaymentSession: createPaymentSession(),
  };

  function fetchPackages() {
    return createAsyncThunk(
      `${name}/fetchPackages`,
      async function (_, { dispatch }) {
        try {
          const response = await fetchWrapper.get(
            "http://3.72.65.135:8080/api/packages"
          );
          dispatch(packagesActions.setPackages(response));
          localStorage.setItem("packages", JSON.stringify(response));
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "An unknown error occurred";
          dispatch(packagesActions.setError(errorMessage));
          dispatch(alertActions.error({ message: errorMessage }));
        }
      }
    );
  }

  function createPaymentSession() {
    return createAsyncThunk(
      `${name}/createPaymentSession`,
      async function (payload, { dispatch }) {
        const { userId, productId } = payload;
        try {
          const response = await fetchWrapper.post(
            "http://3.72.65.135:8080/api/payment/create-session",
            { userId, productId }
          );

          dispatch(
            packagesActions.setPaymentStatus({
              status: "succeeded",
              sessionUrl: response.sessionUrl,
            })
          );

          // Уведомление об успешном создании платежной сессии
          dispatch(
            alertActions.success({
              message: "Платежная сессия успешно создана!",
            })
          );

          // Редирект через 2 секунды после уведомления
          setTimeout(() => {
            window.location.href = response.sessionUrl;
          }, 2000);
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Произошла неизвестная ошибка";

          // Уведомление об ошибке через alertActions.error
          dispatch(alertActions.error({ message: errorMessage }));

          dispatch(
            packagesActions.setPaymentStatus({
              status: "failed",
            })
          );
        }
      }
    );
  }
}
