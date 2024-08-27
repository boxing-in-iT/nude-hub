import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchWrapper from "../helpers/fetch-wrapper";
import { alertActions } from "./alert.slice";
import toast from "react-hot-toast";

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
      async (payload, { dispatch }) => {
        const { userId, productId } = payload;
        try {
          const response = await fetchWrapper.post(
            "http://3.72.65.135:8080/api/packages/buy",
            { userId, productId }
          );

          console.log("Response:", response);

          localStorage.setItem("sessionUrl", response.sessionUrl);

          // Обновляем состояние с помощью dispatch
          dispatch(
            packagesActions.setPaymentStatus({
              status: "succeeded",
              sessionUrl: response.sessionUrl,
            })
          );

          // Редирект на sessionUrl
          window.location.href = response.sessionUrl;

          return response;
        } catch (error) {
          console.log("Error:", error);

          const errorMessage = error.response || "Произошла неизвестная ошибка";

          dispatch(packagesActions.setPaymentStatus({ status: "failed" }));
          dispatch(alertActions.error({ message: errorMessage }));
          toast.error(errorMessage);

          throw error;
        }
      }
    );
  }
}
