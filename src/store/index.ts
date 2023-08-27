import { configureStore } from "@reduxjs/toolkit";

import { user } from "./user/reducer";
import { conversation } from "./conversation/reducer";
import { search } from "./search/reducer";

const store =  configureStore({
  reducer: {
    user: user.reducer,
    conversation: conversation.reducer,
    search: search.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>