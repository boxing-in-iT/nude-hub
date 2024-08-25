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
  };
}

function createExtraActions() {
  const baseUrl = "http://3.72.65.135:8080/api/packages";

  return {
    fetchPackages: fetchPackages(),
  };

  function fetchPackages() {
    return createAsyncThunk(`/fetchPackages`, async function ({ dispatch }) {
      try {
        const response = await fetchWrapper.get(
          "http://3.72.65.135:8080/api/packages"
        );
        dispatch(packagesActions.setPackages(response.data));
        localStorage.setItem("packages", JSON.stringify(response.data));
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An unknown error occurred";
        dispatch(packagesActions.setError(errorMessage));
        dispatch(alertActions.error({ message: errorMessage }));
      }
    });
  }

  //   function fetchPackages() {
  //     return createAsyncThunk(`/fetchPackages`, async (_, { dispatch }) => {
  //       debugger;
  //       dispatch(packagesActions.setLoading());
  //       try {
  //         const response = await fetchWrapper.get(baseUrl);
  //         dispatch(packagesActions.setPackages(response.data));
  //       } catch (error) {
  //         const errorMessage =
  //           error.response?.data?.message || "An unknown error occurred";
  //         dispatch(packagesActions.setError(errorMessage));
  //         dispatch(alertActions.error({ message: errorMessage }));
  //       }
  //     });
  //   }
}
