import { StyleSheet, View } from 'react-native'
import React from 'react'
import DropdownComponent from '../../component/DropdownComponent';
import { LABEL } from '../../config/lang_vn';


const Filter = ({ floors, onPress }) => {

  return (
    <View style={styles.container}>
      <DropdownComponent title={LABEL.Empty_Floor} data={floors} onPress={onPress} />
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
})