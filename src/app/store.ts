import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "../features/Conversation/slice/conversationSlice";
import userReducer from "../features/User/slice/userSlice";
// ...

export const store = configureStore({

  reducer: {
    conversation: conversationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;