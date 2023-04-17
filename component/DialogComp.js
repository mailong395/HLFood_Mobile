import React from 'react'
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { BUTTON } from '../config/lang_vn';

const DialogComp = ({ title = "Thông báo", content, visibleDefault, propsAddFood }) => {
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();

  const hideDialog = () => setVisible(false);

  React.useEffect(() => {
    setVisible(visibleDefault);
  }, [visibleDefault])


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button textColor={theme.colors.error} onPress={hideDialog}>{BUTTON.Cancel}</Button>
          <Button onPress={propsAddFood}>{BUTTON.Ok}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default DialogComp

const styles = StyleSheet.create({})