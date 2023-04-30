import { DrawerLayoutAndroid, StyleSheet, Text } from 'react-native'
import React from 'react'
import LeftDrawer from '../../component/LeftDrawer'
import Container from './Container';

const Cook = () => {
  const drawer = React.useRef(null);

  // handle
  const handleOpenDrawer = () => {
    drawer.current.openDrawer();
  }

  // render
  const renderDrawer = () => {
    return <LeftDrawer />
  }

  // fetch data

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={renderDrawer}
    >
      <Container openDrawer={handleOpenDrawer} />
    </DrawerLayoutAndroid>
  )
}

export default Cook

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})