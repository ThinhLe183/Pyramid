import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConversationState {
  activeConversationId: string | number | undefined;
}

const initialState: ConversationState = {
  activeConversationId: 1,
};
const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
});

const conversationReducer = conversationSlice.reducer;

export default conversationReducer;
