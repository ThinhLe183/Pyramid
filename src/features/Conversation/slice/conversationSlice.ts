import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../../types/Conversation";
import axiosClient from "../../../services/axiosClient";

interface ConversationState {
  activeConversation: Conversation | null | undefined;
  list: Conversation[];
}

const initialState: ConversationState = {
  activeConversation: null,
  list: [],
};

export const fetchConversations = createAsyncThunk(
  "conversation/getList",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get<Conversation[]>("conversations", {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

const conversationReducer = conversationSlice.reducer;

export default conversationReducer;
