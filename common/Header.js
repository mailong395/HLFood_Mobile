import { useEffect } from "react";
import { BackHandler, StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

/**
 * 
 * @param {Object} param
 * @param {"small" | "medium" | "large" | "center-aligned" | undefined} param.mode
 * @returns 
 */
const Header = ({mode, isShowButtonGoBack = false, title = '', props}) => {
  const theme = useTheme();

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