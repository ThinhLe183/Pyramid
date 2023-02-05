import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "../../../types/User";
import axiosClient from "../../../services/axiosClient";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

interface UserState {
  data: User | null;
  loading: boolean;
  currentRequestId: string | undefined;
  error: any;
}

const initialState: UserState = {
  data: null,
  loading: false,
  currentRequestId: undefined,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (body: { username: string; password: string }, thunkAPI) => {
    const response = await axiosClient.post("auth/login", body, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

export const fetchUser = createAsyncThunk("user/get", async (_, thunkAPI) => {
  try {
    const response = await axiosClient.get<User>("users/me", {
      signal: thunkAPI.signal,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.data = action.payload;
    },
    resetError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { user, access_token, refresh_token } = action.payload;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        state.data = user;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.data = user;
      })
      .addMatcher(
        (action): action is PendingAction => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          const { requestId } = action.meta;
          if (state.loading && state.currentRequestId === requestId) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const { requestId } = action.meta;
          if (state.loading && state.currentRequestId === requestId) {
            state.loading = false;
            state.error = action.error;
            state.currentRequestId = undefined;
          }
        }
      );
  },
});

export const { setUser, resetError } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
