import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../../types/Conversation";
import axiosClient from "../../../services/axiosClient";
import { Message } from "../../../types/Message";

interface ConversationState {
  list: Conversation[];
  isConversationLoading: boolean;
  isMessagesLoading: boolean;
  currentRequestId: string | undefined;
}

const initialState: ConversationState = {
  list: [],
  isConversationLoading: false,
  isMessagesLoading: false,
  currentRequestId: undefined,
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
export const fetchMessages = createAsyncThunk(
  "conversation/getMessages",
  async (conversationId: string, thunkAPI) => {
    try {
      const response = await axiosClient.get<Message[]>(
        `conversations/${conversationId}/messages`,
        { signal: thunkAPI.signal }
      );
      return { messages: response.data, conversationId };
    } catch (error) {
      throw error;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/postMessage",
  async ({ conversationId, msg }: { conversationId: string; msg: string }) => {
    try {
      const response = await axiosClient.post<Message>(
        `conversations/${conversationId}/messages`,
        { type: "DEFAULT", msg }
      );
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
    resetState: () => initialState,
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
        const { messages, conversationId } = action.payload;
        const selectedConversation = state.list.find(
          (c) => c.id === conversationId
        );
        if (selectedConversation) selectedConversation.messages = messages;
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
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload;

        const index = state.list.findIndex(
          (conversation) => conversation.id === message.conversation_id
        );

        if (index !== -1) {
          state.list[index].messages?.push(message);
          state.list[index].last_message = {
            type: message.type,
            attachments: message.attachments,
            author_id: message.author.id,
            author_name: message.author.name,
            mentions: message.mentions,
            msg: message.msg,
            ts: message.ts,
          };
        }
      });
  },
});

export const { resetState } = conversationSlice.actions;

const conversationReducer = conversationSlice.reducer;

export default conversationReducer;
