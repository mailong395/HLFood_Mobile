import { useEffect } from "react";
import { BackHandler, StyleSheet, Text } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

/**
 * 
 * @param {Object} param
 * @param {"small" | "medium" | "large" | "center-aligned" | undefined} param.mode
 * @returns 
 */
const Header = ({ mode, isShowButtonGoBack = false, isShowDrawer = false, title = '', props, openDrawer }) => {
  const theme = useTheme();

  const handleCloseDrawer = () => {
    openDrawer();
  }

  useEffect(() => {
    const backAction = () => {
      props();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Appbar.Header mode={mode} style={{ backgroundColor: theme.colors.primaryContainer }}>
      {isShowDrawer && <Appbar.Action icon="menu" onPress={openDrawer} />}
      {isShowButtonGoBack && <Appbar.BackAction onPress={() => props()} />}
      <Appbar.Content title={title} style={styles.title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
  }
});

export default Header;