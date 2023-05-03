import { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { FoodContext } from "../context/FoodContext";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { CONTENT, LABEL } from "../config/lang_vn";

const ItemFood = ({
  image,
  name = "",
  price = 0,
  quantity,
  handleAddFood,
  handleRemoveFood,
  isEdit = false,
  isHiddenPlus = false,
  onchangeText,
  onRemove,
  description }) => {
  const [note, setNote] = useState(false);
  const [edit, setEdit] = useState(isEdit);
  const theme = useTheme();

  return (
    <Card mode="contained" style={styles.container}>
      <Card.Cover source={{ uri: image }} />
      <Card.Content style={styles.content}>
        <Text variant="titleLarge">{name}</Text>
        <Text variant="titleMedium">{formatCurrency({ amount: price, code: "VND" })[0]}</Text>
        {!edit && <Text>{CONTENT.quantity} : <Text variant="titleMedium">{quantity}</Text></Text>}

      </Card.Content>

      {(note || description) && <Card.Content>
        <TextInput
          label={LABEL.detailsFood}
          value={description}
          mode="outlined"
          onChangeText={text => onchangeText(text)}
        />
      </Card.Content>}

      {edit ?
        <Card.Actions>
          <IconButton
            mode="contained"
            icon="minus"
            size={24}
            onPress={() => handleRemoveFood()}
          />
          <Text>{quantity}</Text>
          {!isHiddenPlus && <IconButton
            icon="plus"
            size={24}
            onPress={() => handleAddFood()}
          />}
          {!note &&
            <IconButton
              mode="contained"
              icon="square-edit-outline"
              size={24}
              onPress={() => setNote(!note)}
            />}
        </Card.Actions>
        :
        <Card.Actions>
          <IconButton
            mode="contained"
            icon="pencil-outline"
            size={24}
            onPress={() => setEdit(true)}
          />
          <IconButton
            mode="contained"
            icon="delete-outline"
            size={24}
            iconColor={theme.colors.error}
            onPress={onRemove}
          />

        </Card.Actions>
      }
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    marginVertical: 8,
  },
  image: {
    height: 46,
    width: 46,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#343434",
  },
  textPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: "#343434",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 40,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 4,
  },
  titleButton: {
    fontSize: 18,
    fontWeight: "500",
  },
  textCount: {

  },
});

export default ItemFood;