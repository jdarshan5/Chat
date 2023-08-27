import axios from "axios";

import store from "..";
import { ADD_CONVERSATION } from "./reducer";

export const fetchConversation = async () => {
  return await axios.get('/conversation').then(res => {
    const { data } = res;
    store.dispatch(ADD_CONVERSATION(data));
    return true;
  }).catch(error => {
    console.error(error);
    return false;
  });
}

export const fetchMessages = async (convId: string) => {
  return await axios.get(`/message/${convId}`).then(res => {
    const { data } = res;
  }).catch(error => {
    console.error(error);
  });
}