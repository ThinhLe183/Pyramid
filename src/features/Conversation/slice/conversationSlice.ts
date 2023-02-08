import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../../types/Conversation";
import axiosClient from "../../../services/axiosClient";
import { Message } from "../../../types/Message";

interface ConversationState {
  selectedConversation: Conversation | null;
  messages: Message[];
  list: Conversation[];
  isConversationLoading: boolean;
  isMessagesLoading: boolean;
  currentRequestId: string | undefined;
}

const initialState: ConversationState = {
  selectedConversation: null,
  messages: [],
  ////
  list: [],
  isConversationLoading: false,
  isMessagesLoading: false,
  currentRequestId: undefined,
};

export const fetchConversations = createAsyncThunk(
  "conversation/getList",
  async (_, thunkAPI) => {
    try {
      console.log("good good");
      const response = await axiosClient.get<Conversation[]>("conversations", {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchMessages = createAsyncThunk(
  "conversation/getMessages",
  async (id: string, thunkAPI) => {
    try {
      console.log(id);
      const response = await axiosClient.get<Message[]>(
        `conversations/${id}/messages`,
        { signal: thunkAPI.signal }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<string>) => {
      const conversation = state.list.find(
        (conversation) => conversation.id === action.payload
      );
      if (conversation) {
        state.selectedConversation = conversation;
      } else {
        state.selectedConversation = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.list = action.payload;
        const { requestId } = action.meta;
        if (
          state.isConversationLoading &&
          state.currentRequestId === requestId
        ) {
          state.isConversationLoading = false;
          state.currentRequestId = undefined;
        }
      })

      .addCase(fetchConversations.pending, (state, action) => {
        state.isConversationLoading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.isConversationLoading &&
          state.currentRequestId === requestId
        ) {
          state.isConversationLoading = false;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchMessages.pending, (state, action) => {
        state.isMessagesLoading = true;
        state.currentRequestId = action.meta.requestId;
      })

      .addCase(fetchMessages.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.isMessagesLoading && state.currentRequestId === requestId) {
          state.isMessagesLoading = false;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { setSelectedConversation } = conversationSlice.actions;

const conversationReducer = conversationSlice.reducer;

export default conversationReducer;
