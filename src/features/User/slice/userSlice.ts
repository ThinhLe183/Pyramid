import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "../../../types/User";
import axiosClient from "../../../services/axiosClient";
import { fetchConversations } from "../../Conversation/slice/conversationSlice";

interface UserState {
  data: User | null;
  loading: boolean;
  currentRequestId: string | undefined;
  isAuthenticating: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
  currentRequestId: undefined,
  isAuthenticating: true,
};

export const login = createAsyncThunk(
  "user/login",
  async (body: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosClient.post("auth/login", body, {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
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
    setUser: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
      state.isAuthenticating = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { user, access_token, refresh_token } = action.payload;
        state.data = user;
        state.currentRequestId = undefined;
        console.log(action.payload);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        axiosClient.defaults.headers.Authorization = `Bearer ${access_token}`;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.isAuthenticating = false;
          state.data = action.payload;
          state.loading = false;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.isAuthenticating = false;
        }
      });
  },
});

export const { setUser, logout } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
