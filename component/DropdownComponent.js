import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';

const DropdownComponent = ({ title = '', data = [], onPress }) => {
  const [country, setCountry] = useState();
  const theme = useTheme();

  const handleOnChange = (value) => {
    onPress(value.key);
    setCountry(value);
  }

  return (
    <SelectCountry
      style={[styles.dropdown, {  backgroundColor: theme.colors.primaryContainer }]}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      maxHeight={200}
      value={country}
      data={data}
      valueField="key"
      labelField="label"
      placeholder={title}
      searchPlaceholder="Search..."
      onChange={e => handleOnChange(e)}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingLeft: 16,
    margin: 8,
    maxWidth: 120,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});