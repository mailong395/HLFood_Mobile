import { ToastAndroid } from "react-native";

export const Toast = (title = '') => {
  ToastAndroid.showWithGravity(
    title,
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
  )
}
