import { StyleSheet, View } from "react-native";
import { Card, IconButton, MD3Colors, Switch, Text, useTheme } from 'react-native-paper';
import { CMS } from "../config/config";
import { useState } from "react";

const TableComp = ({
  nTable,
  status,
  nFloor = 0,
  nChair = 4,
  time = '',
  onPress,
  backgroundColor = 'white',
  color = "#343434",
  borderWidth = 0,
  isCheckBox = false,
  isDeleted = false,
  navigation,
  data,
}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(!isDeleted);
  const theme = useTheme();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const handleEdit = () => {
    navigation.navigate('AddTable', {data: {...data, is_edit: true}});
  }

  return (
    <View style={styles.container}>
      <Card
        style={{
          borderWidth: borderWidth,
          borderColor: theme.colors.primary,
          backgroundColor: backgroundColor,
          width: '100%'
        }}
        onPress={onPress}
      >
        <Card.Actions>
          {
            isCheckBox &&
            <>
              {/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /> */}
              <IconButton
                icon="square-edit-outline"
                onPress={handleEdit}
              />
            </>
          }
        </Card.Actions>
        <Card.Content>
          <View style={[styles.headerCard, styles.boxFlex, { borderColor: color }]}>
            <Text variant="bodyMedium" style={{ color: color }}>tầng {nFloor}</Text>
            <Text variant="bodyMedium" style={{ color: color }}>{time}</Text>
          </View>
          <View style={styles.boxFlex}>
            <Text variant="titleLarge" style={{ color: color, marginTop: 8 }}>Bàn {nTable}</Text>
            <Text variant="bodyMedium" style={{ color: color }}>{nChair} {CMS.nChair}</Text>
          </View>
          <Text variant="bodyMedium" style={{ color: color }}>{status}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  boxFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  headerCard: {
    // borderBottomWidth: 1,
    // paddingBottom: 8,
  }
});

export default TableComp;