import { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { Appbar, Badge, useTheme } from 'react-native-paper';

/**
 *
 * @param {Object} param
 * @param {"small" | "medium" | "large" | "center-aligned" | undefined} param.mode
 * @returns
 */
const Header = ({
  mode,
  isShowNotification = false,
  isShowButtonGoBack = false,
  isShowDrawer = false,
  title = '',
  props,
  openDrawer,
  isPlus,
  handlePlus,
  openNotified,
}) => {
  const theme = useTheme();

  const handleCloseDrawer = () => {
    openDrawer();
  };

  const handleOpenNotified = () => {
    openNotified();
  };

  useEffect(() => {
    if (isShowButtonGoBack) {
      const backAction = () => {
        props();
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }
  }, []);

  return (
    <Appbar.Header mode={mode} style={{ backgroundColor: theme.colors.primaryContainer }}>
      {isShowDrawer && <Appbar.Action icon="menu" onPress={openDrawer} />}
      {isShowButtonGoBack && <Appbar.BackAction onPress={() => props()} />}
      <Appbar.Content title={title} style={styles.title} />
      {isPlus && <Appbar.Action icon="plus" onPress={handlePlus} />}
      {isShowNotification && <View>
        <Badge size={14} style={styles.badge} />
        <Appbar.Action icon="bell" onPress={handleOpenNotified} />
      </View>}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
  }
});

export default Header;
