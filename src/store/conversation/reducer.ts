import { createSlice } from "@reduxjs/toolkit";

import { UserType } from "../user/reducer";
import { sortByDate } from "../../utils";

export type MessageType = {
  "_id": string,
  "conversation": string,
  "sender": string,
  "seen": Array<string>,
  "message": string,
  "created_at": string,
  "__v": number,
};

export type ConversationType = {
  "_id": string,
  "members": Array<UserType>,
  "__v": number,
  "created_at": string,
  "updated_at": string,
  "last_message": MessageType | null,
  "messages": Array<MessageType>,
};

export interface ConversationInitialStateType {
  conversations: Array<ConversationType>,
  selectedConversation: ConversationType | null,
};

const initState: ConversationInitialStateType = {
  conversations: [],
  selectedConversation: {
    _id: '',
    members: [],
    __v: 0,
    created_at: '',
    updated_at: '',
    last_message: null,
    messages: [],
  },
};

export const conversation = createSlice({
  name: 'Conversation',
  initialState: initState,
  reducers: {
    ADD_CONVERSATION: (state, action) => {
      state.conversations = action.payload;
      state.conversations.sort((a, b) => sortByDate(a, b, 'updated_at'));
    },
    ADD_TO_CONVERSATION: (state, action) => {
      state.conversations.unshift(action.payload);
      const selectedConversationIndex = state.conversations.findIndex(i => i._id === action.payload);
      state.selectedConversation = state.conversations[selectedConversationIndex];
      state.selectedConversation?.messages.sort((a, b) => sortByDate(a, b, 'created_at'));
    },
    SELECT_CONVERSATION: (state, action) => {
      const selectedConversationIndex = state.conversations.findIndex(i => i._id === action.payload);
      state.selectedConversation = state.conversations[selectedConversationIndex];
      state.selectedConversation.messages.sort((a, b) => sortByDate(a, b, 'created_at'));
    },
    UPDATE_LAST_MESSAGE: (state, action) => {
      const payload: MessageType = action.payload;
      const index = state.conversations.findIndex(i => i._id === payload.conversation);
      state.conversations[index].last_message = payload;
    },
    ADD_MESSAGE: (state, action) => {
      const payload: MessageType = action.payload;
      const index = state.conversations.findIndex(i => i._id === payload.conversation);
      state.conversations[index].messages.push(payload);
      state.conversations[index].members.sort((a, b) => sortByDate(a, b, 'created_at'));
      if (state.selectedConversation !== null) {
        if (state.selectedConversation._id === payload.conversation) {
          state.selectedConversation.messages.push(payload);
          state.selectedConversation.messages.sort((a, b) => sortByDate(a, b, 'created_at'));
        }
      }
    },
    UPDATE_MESSAGE: (state, action) => {
      const { payload }: { payload: MessageType } = action;
      const conversationIndex = state.conversations.findIndex(i => i._id === payload.conversation);
      if (conversationIndex === -1) return state;
      const messageIndex = state.conversations[conversationIndex].messages.findIndex(i => i._id === payload._id);
      if (messageIndex === -1) return state;
      state.conversations[conversationIndex].messages[messageIndex] = payload;
      if (state.selectedConversation !== null) {
        if (state.selectedConversation._id === payload.conversation) {
          const selectedConversationMessageIndex = state.selectedConversation.messages.findIndex(i => i._id === payload._id);
          state.selectedConversation.messages[selectedConversationMessageIndex] = payload;
        }
      }
    },
  },
});

export const {
  ADD_CONVERSATION,
  ADD_TO_CONVERSATION,
  SELECT_CONVERSATION,
  UPDATE_LAST_MESSAGE,
  ADD_MESSAGE,
  UPDATE_MESSAGE,
} = conversation.actions;
