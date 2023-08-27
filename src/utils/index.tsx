import {
  ToastAndroid
} from "react-native";
import { ConversationType, MessageType } from "../store/conversation/reducer";

export const logAPIErrors = (apiName: String, method: String, error: Error) => {
  console.error(`${apiName} "${method}" Error: ${error}`);
}

export const ToastMessage = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.BOTTOM);
}

type objectWithCreatedDate = {
  updated_at: string,
  created_at: string,
};

/**
 * Used to sort an array by Date
*/
export const sortByDate = (a: any, b: any, key: 'updated_at' | 'created_at', asc = true): number => {
  if (new Date(a[key]) > new Date(b[key])) {
    return asc ? -1 : 1;
  } else if (new Date(a[key]) < new Date(b[key])) {
    return asc ? 1 : -1;
  } else {
    return 0;
  }
}