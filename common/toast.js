export default Toast = (title = '') => {
  ToastAndroid.showWithGravity(
    title,
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
  )
}
